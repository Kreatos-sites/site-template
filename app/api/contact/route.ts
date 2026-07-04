import { NextResponse } from "next/server";
import { z } from "zod";

import config from "@/site.config";

const payloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
});

/**
 * Envío del formulario de contacto vía Resend.
 * - Si flags.contactForm es false, la ruta se comporta como inexistente (404).
 * - Requiere RESEND_API_KEY en el entorno. Opcional: CONTACT_FROM
 *   (remitente verificado en Resend; por defecto onboarding@resend.dev).
 * - Destinatario: CONTACT_FORWARD_EMAIL (env) o, en su defecto,
 *   business.email. Si no existe ninguno, responde 503.
 */
export async function POST(request: Request) {
  if (!config.flags.contactForm) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const forwardTo = process.env.CONTACT_FORWARD_EMAIL ?? config.business.email;
  if (!forwardTo) {
    return NextResponse.json(
      {
        error: "no_recipient",
        message:
          "No hay destinatario configurado: define CONTACT_FORWARD_EMAIL o business.email.",
      },
      { status: 503 },
    );
  }

  const { name, email, phone, message } = parsed.data;
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Sitio web <onboarding@resend.dev>",
    to: [forwardTo],
    replyTo: email,
    subject: `Nuevo mensaje del sitio web: ${name}`,
    text: [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
