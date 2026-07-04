import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { fullAddress } from "@/lib/config";
import config from "@/site.config";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Aviso de privacidad de ${config.business.name}, conforme a la LFPDPPP.`,
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: false, follow: true },
};

/**
 * Aviso de privacidad genérico conforme a la Ley Federal de Protección
 * de Datos Personales en Posesión de los Particulares (LFPDPPP).
 * Es texto motor parametrizado con config.business: NO requiere edición
 * al personalizar el sitio, solo mantener site.config.ts correcto.
 * No sustituye asesoría legal específica del cliente.
 */
export default function AvisoDePrivacidadPage() {
  const t = useTranslations("privacy");
  const { business } = config;
  const address = fullAddress(business);

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
          <h2>Identidad y domicilio del responsable</h2>
          <p>
            {business.name}, con domicilio en {address} (en adelante, el
            &ldquo;Responsable&rdquo;), es responsable del tratamiento de sus datos
            personales conforme al presente aviso de privacidad, emitido en
            cumplimiento de la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares (LFPDPPP), su Reglamento y los
            Lineamientos del Aviso de Privacidad.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Datos personales que recabamos</h2>
          <p>
            Para las finalidades señaladas en este aviso, el Responsable puede
            recabar los siguientes datos personales: nombre completo, teléfono,
            correo electrónico, así como la información que usted proporcione
            voluntariamente a través del formulario de contacto, por teléfono,
            por WhatsApp o en nuestras oficinas. No recabamos datos personales
            sensibles a través de este sitio web.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Finalidades del tratamiento</h2>
          <p>Sus datos personales serán utilizados para las siguientes finalidades primarias:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Atender su solicitud de contacto, información o cotización.</li>
            <li>Agendar y dar seguimiento a citas o consultas.</li>
            <li>Prestar los servicios que, en su caso, usted contrate.</li>
            <li>Emitir los comprobantes fiscales correspondientes.</li>
          </ul>
          <p>
            De manera secundaria, y solo si usted no manifiesta su negativa,
            podremos utilizar sus datos para informarle sobre servicios,
            cambios normativos o comunicaciones relacionadas con nuestra
            actividad. Puede oponerse a estas finalidades secundarias en
            cualquier momento escribiendo a {business.email}.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Transferencias de datos</h2>
          <p>
            El Responsable no vende ni cede sus datos personales a terceros.
            Solo se realizarán transferencias en los casos previstos por el
            artículo 37 de la LFPDPPP, o cuando sean necesarias para la
            prestación del servicio con proveedores que actúan por cuenta del
            Responsable (por ejemplo, servicios de hospedaje web o envío de
            correo), quienes tratan los datos conforme a este aviso.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Derechos ARCO y revocación del consentimiento</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos, para
            qué los utilizamos y las condiciones de su uso (Acceso); a
            solicitar su corrección cuando sean inexactos (Rectificación); a
            pedir que los eliminemos (Cancelación), y a oponerse a su uso para
            fines específicos (Oposición). Asimismo, puede revocar el
            consentimiento otorgado.
          </p>
          <p>
            Para ejercer estos derechos, envíe una solicitud al correo{" "}
            {business.email} o preséntela en nuestro domicilio, indicando su
            nombre completo, el derecho que desea ejercer y un medio para
            comunicarle la respuesta. Responderemos en los plazos que establece
            la LFPDPPP.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Uso de cookies y tecnologías de rastreo</h2>
          <p>
            Este sitio puede utilizar cookies técnicas necesarias para su
            funcionamiento, como la preferencia de modo claro u oscuro. No
            utilizamos cookies para crear perfiles publicitarios.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Cambios al aviso de privacidad</h2>
          <p>
            El presente aviso puede sufrir modificaciones derivadas de nuevos
            requerimientos legales o de nuestras propias prácticas. Cualquier
            cambio se publicará en esta misma página. Le recomendamos
            consultarla periódicamente.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Autoridad competente</h2>
          <p>
            Si considera que su derecho a la protección de datos personales ha
            sido vulnerado, puede acudir ante la autoridad competente en
            materia de protección de datos personales en México.
          </p>
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
