import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { fullAddress } from "@/lib/config";
import config from "@/site.config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { business: config.business.name }),
    alternates: { canonical: "/aviso-de-privacidad" },
    robots: { index: false, follow: true },
  };
}

/**
 * Aviso de privacidad genérico conforme a la Ley Federal de Protección
 * de Datos Personales en Posesión de los Particulares (LFPDPPP).
 * Es texto motor parametrizado con config.business: NO requiere edición
 * al personalizar el sitio, solo mantener site.config.ts correcto.
 * Todo el copy vive en messages/es.json (namespace `privacy`) — cero texto
 * hardcodeado. No sustituye asesoría legal específica del cliente.
 */
export default function AvisoDePrivacidadPage() {
  const t = useTranslations("privacy");
  const { business } = config;
  const address = fullAddress(business);

  // Contacto para oponerse a finalidades secundarias / ejercer derechos: correo
  // si existe, si no el teléfono + domicilio.
  const optOut = business.email
    ? t("purposes.optOutEmail", { email: business.email })
    : t("purposes.optOutOffline", { phone: business.phone });

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
        {business.name}
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{t("updated")}</p>

      <div className="mt-12 space-y-10 text-[0.95rem] leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-foreground">
        <section className="space-y-3">
          <h2>{t("identity.heading")}</h2>
          <p>{t("identity.body", { name: business.name, address })}</p>
        </section>

        <section className="space-y-3">
          <h2>{t("data.heading")}</h2>
          <p>{t("data.body")}</p>
        </section>

        <section className="space-y-3">
          <h2>{t("purposes.heading")}</h2>
          <p>{t("purposes.intro")}</p>
          <ul className="list-disc space-y-1 pl-5">
            {(t.raw("purposes.items") as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t("purposes.secondary", { contact: optOut })}</p>
        </section>

        <section className="space-y-3">
          <h2>{t("transfers.heading")}</h2>
          <p>{t("transfers.body")}</p>
        </section>

        <section className="space-y-3">
          <h2>{t("arco.heading")}</h2>
          <p>{t("arco.body")}</p>
          <p>
            {business.email
              ? t("arco.howEmail", { email: business.email })
              : t("arco.howOffline", { phone: business.phone })}{" "}
            {t("arco.tail")}
          </p>
        </section>

        <section className="space-y-3">
          <h2>{t("cookies.heading")}</h2>
          <p>{t("cookies.body")}</p>
        </section>

        <section className="space-y-3">
          <h2>{t("changes.heading")}</h2>
          <p>{t("changes.body")}</p>
        </section>

        <section className="space-y-3">
          <h2>{t("authority.heading")}</h2>
          <p>{t("authority.body")}</p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-14 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {t("back")}
      </Link>
    </main>
  );
}
