import { Button, Heading, Section, Text } from "@react-email/components";

import type { ContactPayload } from "@/lib/contact-schema";
import type { EmailBrand } from "@/lib/emails";
import { BrandedLayout, emailStyles } from "./branded-layout";

/**
 * Correo al DUEÑO del negocio: un lead nuevo llegó por el formulario de
 * contacto del sitio generado. Brandeado con el color/logo del sitio.
 */
export function LeadNotificationEmail({
  data,
  brand,
}: {
  data: ContactPayload;
  brand: EmailBrand;
}) {
  const rows: Array<[string, string]> = [
    ["Nombre", data.name],
    ["Teléfono", data.phone],
    ...(data.email ? ([["Correo", data.email]] as Array<[string, string]>) : []),
    ["Mensaje", data.message],
  ];

  return (
    <BrandedLayout brand={brand} preview={`Nuevo mensaje de ${data.name}`}>
      <Section style={{ padding: "26px 32px 0 32px" }}>
        <Heading as="h1" style={emailStyles.heading}>
          Nuevo mensaje desde {brand.businessShort}
        </Heading>
        <Text style={emailStyles.paragraph}>
          Un visitante dejó sus datos en el formulario de contacto del sitio.
        </Text>
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
          Llamar a {data.name}
        </Button>
      </Section>
    </BrandedLayout>
  );
}

export default LeadNotificationEmail;
