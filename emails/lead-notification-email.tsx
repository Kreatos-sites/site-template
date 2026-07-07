import { Button, Heading, Section, Text } from "@react-email/components";

import type { ContactPayload } from "@/lib/contact-schema";
import type { EmailBrand } from "@/lib/emails";
import { BrandedLayout, emailStyles } from "./branded-layout";

/** Copy ya resuelto (i18n) que el route inyecta — cero texto fijo aquí. */
export interface LeadEmailCopy {
  lang: string;
  preview: string;
  heading: string;
  intro: string;
  call: string;
  labels: { name: string; phone: string; email: string; message: string };
}

/**
 * Correo al DUEÑO del negocio: un lead nuevo llegó por el formulario de
 * contacto del sitio generado. Brandeado con el color/logo del sitio. Todo el
 * copy llega resuelto en `copy` (i18n desde messages/es.json vía el route).
 */
export function LeadNotificationEmail({
  data,
  brand,
  copy,
}: {
  data: ContactPayload;
  brand: EmailBrand;
  copy: LeadEmailCopy;
}) {
  const rows: Array<[string, string]> = [
    [copy.labels.name, data.name],
    [copy.labels.phone, data.phone],
    ...(data.email
      ? ([[copy.labels.email, data.email]] as Array<[string, string]>)
      : []),
    [copy.labels.message, data.message],
  ];

  return (
    <BrandedLayout brand={brand} lang={copy.lang} preview={copy.preview}>
      <Section style={{ padding: "26px 32px 0 32px" }}>
        <Heading as="h1" style={emailStyles.heading}>
          {copy.heading}
        </Heading>
        <Text style={emailStyles.paragraph}>{copy.intro}</Text>
      </Section>

      {rows.map(([label, value]) => (
        <Section key={label} style={{ padding: "14px 32px 0 32px" }}>
          <Text style={emailStyles.detailLabel}>{label}</Text>
          <Text style={emailStyles.detailValue}>{value}</Text>
        </Section>
      ))}

      <Section style={{ padding: "24px 32px 0 32px" }}>
        <Button
          href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}
          style={{
            backgroundColor: brand.accent,
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
            padding: "11px 24px",
            textDecoration: "none",
          }}
        >
          {copy.call}
        </Button>
      </Section>
    </BrandedLayout>
  );
}

export default LeadNotificationEmail;
