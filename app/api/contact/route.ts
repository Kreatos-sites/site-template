import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { createElement } from "react";

import { contactSchema } from "@/lib/contact-schema";
import { emailBrand } from "@/lib/emails";
import { LeadNotificationEmail } from "@/emails/lead-notification-email";
import { VisitorThankYouEmail } from "@/emails/visitor-thank-you-email";
import config from "@/site.config";

/**
 * Envío del formulario de contacto vía Resend + react-email. Manda DOS correos,
 * ambos brandeados con la identidad del sitio (color, logo, nombre):
 *  1. Notificación al dueño (LEAD_NOTIFY_TO) — el lead con sus datos.
 *  2. Agradecimiento al visitante (si dejó correo).
 *
 * Valida con el MISMO schema zod que el cliente (seguridad real, no solo UX).
 * Env:
 *  - RESEND_API_KEY (requerido).
 *  - CONTACT_FROM (remitente verificado en Resend; default onboarding@resend.dev).
 *  - LEAD_NOTIFY_TO — a quién llegan los leads (uno o varios, separados por coma).
 *    Fallback: CONTACT_FORWARD_EMAIL, luego business.email.
 *  - NEXT_PUBLIC_SITE_URL — URL pública del sitio (logo absoluto + enlaces).
 */
export async function POST(request: Request) {
  if (!config.flags.contactForm) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const owners = (
    process.env.LEAD_NOTIFY_TO ??
    process.env.CONTACT_FORWARD_EMAIL ??
    config.business.email ??
    ""
  )
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (owners.length === 0) {
    return NextResponse.json(
      {
        error: "no_recipient",
        message:
          "No hay destinatario: define LEAD_NOTIFY_TO (uno o varios correos) o business.email.",
      },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const brand = emailBrand();
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM ??
    `${config.business.shortName ?? config.business.name} <onboarding@resend.dev>`;

  // Copy de los correos en el idioma del sitio (i18n): sin request-locale aquí,
  // se resuelve con el locale default del sitio. Cero texto de correo hardcodeado.
  const locale = config.locales?.[0] ?? "es";
  const t = await getTranslations({ locale, namespace: "email" });
  const firstName = data.name.split(" ")[0] || data.name;

  const leadCopy = {
    lang: locale,
    preview: t("lead.preview", { name: data.name }),
    heading: t("lead.heading", { short: brand.businessShort }),
    intro: t("lead.intro"),
    call: t("lead.call", { name: data.name }),
    labels: {
      name: t("lead.labelName"),
      phone: t("lead.labelPhone"),
      email: t("lead.labelEmail"),
      message: t("lead.labelMessage"),
    },
  };

  // 1. Notificación al dueño — si falla, es error real (no se recibió el lead).
  const { error } = await resend.emails.send({
    from,
    to: owners,
    ...(data.email ? { replyTo: data.email } : {}),
    subject: t("lead.subject", { name: data.name }),
    react: createElement(LeadNotificationEmail, { data, brand, copy: leadCopy }),
  });
  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  // 2. Agradecimiento al visitante — best-effort: no tumba el envío si falla.
  if (data.email) {
    const visitorCopy = {
      lang: locale,
      preview: t("visitor.preview", { business: brand.businessName }),
      heading: t("visitor.heading", { firstName }),
      body: t("visitor.body", { business: brand.businessName }),
      body2: t("visitor.body2"),
      cta: t("visitor.cta"),
    };
    await resend.emails
      .send({
        from,
        to: [data.email],
        subject: t("visitor.subject", { business: brand.businessName }),
        react: createElement(VisitorThankYouEmail, { brand, copy: visitorCopy }),
      })
      .catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
