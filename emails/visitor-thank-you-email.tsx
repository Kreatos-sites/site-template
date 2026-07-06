import { Button, Heading, Section, Text } from "@react-email/components";

import type { ContactPayload } from "@/lib/contact-schema";
import type { EmailBrand } from "@/lib/emails";
import { BrandedLayout, emailStyles } from "./branded-layout";

/**
 * Correo al VISITANTE que dejó sus datos: agradecimiento + seguimiento.
 * Brandeado con el color/logo del sitio generado. Solo se manda si el visitante
 * dio un correo.
 */
export function VisitorThankYouEmail({
  data,
  brand,
}: {
  data: ContactPayload;
  brand: EmailBrand;
}) {
  const firstName = data.name.split(" ")[0] || data.name;

  return (
    <BrandedLayout
      brand={brand}
      preview={`Recibimos tu mensaje en ${brand.businessName}`}
    >
      <Section style={{ padding: "26px 32px 0 32px" }}>
        <Heading as="h1" style={emailStyles.heading}>
          Gracias por escribirnos, {firstName}
        </Heading>
        <Text style={emailStyles.paragraph}>
          Recibimos tu mensaje en {brand.businessName}. Un miembro de nuestro
          equipo se pondrá en contacto contigo muy pronto para dar seguimiento.
        </Text>
        <Text style={emailStyles.paragraph}>
          Mientras tanto, puedes visitar el sitio para conocer más:
        </Text>
      </Section>

      <Section style={{ padding: "24px 32px 0 32px" }}>
        <Button
          href={brand.siteUrl}
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
          Visitar el sitio
        </Button>
      </Section>
    </BrandedLayout>
  );
}

export default VisitorThankYouEmail;
