import { Button, Heading, Section, Text } from "@react-email/components";

import type { EmailBrand } from "@/lib/emails";
import { BrandedLayout, emailStyles } from "./branded-layout";

/** Copy ya resuelto (i18n) que el route inyecta — cero texto fijo aquí. */
export interface VisitorEmailCopy {
  lang: string;
  preview: string;
  heading: string;
  body: string;
  body2: string;
  cta: string;
}

/**
 * Correo al VISITANTE que dejó sus datos: agradecimiento + seguimiento.
 * Brandeado con el color/logo del sitio generado. Solo se manda si el visitante
 * dio un correo. Todo el copy llega resuelto en `copy` (i18n desde el route).
 */
export function VisitorThankYouEmail({
  brand,
  copy,
}: {
  brand: EmailBrand;
  copy: VisitorEmailCopy;
}) {
  return (
    <BrandedLayout brand={brand} lang={copy.lang} preview={copy.preview}>
      <Section style={{ padding: "26px 32px 0 32px" }}>
        <Heading as="h1" style={emailStyles.heading}>
          {copy.heading}
        </Heading>
        <Text style={emailStyles.paragraph}>{copy.body}</Text>
        <Text style={emailStyles.paragraph}>{copy.body2}</Text>
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
          {copy.cta}
        </Button>
      </Section>
    </BrandedLayout>
  );
}

export default VisitorThankYouEmail;
