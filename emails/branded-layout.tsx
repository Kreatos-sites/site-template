import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { EmailBrand } from "@/lib/emails";

const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/**
 * Envoltura de marca para los correos (react-email). Barra de acento con el
 * color del sitio, logo del sitio (o su nombre), contenido y pie con los datos
 * del negocio. Todo BRANDEADO con `brand` (que sale de emailBrand() en lib/emails).
 */
export function BrandedLayout({
  brand,
  preview,
  children,
}: {
  brand: EmailBrand;
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: "#f3f1f1",
          margin: 0,
          padding: "40px 16px",
          fontFamily: SANS,
        }}
      >
        <Container
          style={{
            width: "480px",
            maxWidth: "100%",
            backgroundColor: "#ffffff",
            border: "1px solid #e8e4e3",
          }}
        >
          <Section
            style={{
              height: "4px",
              backgroundColor: brand.accent,
              fontSize: 0,
              lineHeight: "0",
            }}
          />
          <Section style={{ padding: "30px 32px 0 32px" }}>
            {brand.logoUrl ? (
              <Img
                src={brand.logoUrl}
                alt={brand.businessShort}
                height={28}
                style={{ height: "28px", width: "auto", border: 0 }}
              />
            ) : (
              <Text
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#0c0a09",
                }}
              >
                {brand.businessShort}
              </Text>
            )}
          </Section>

          {children}

          <Section style={{ padding: "28px 32px 32px 32px" }}>
            <Hr style={{ borderColor: "#e8e4e3", margin: "0 0 16px 0" }} />
            <Text
              style={{
                margin: 0,
                fontSize: "12px",
                lineHeight: "18px",
                color: "#7c6d67",
              }}
            >
              {brand.businessName}
              {brand.phone ? ` · ${brand.phone}` : ""}
            </Text>
            <Text
              style={{
                margin: "8px 0 0 0",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#7c6d67",
              }}
            >
              <Link
                href={brand.siteUrl}
                style={{ color: brand.accent, textDecoration: "underline" }}
              >
                {brand.domain}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/** Estilos compartidos de contenido para los correos. */
export const emailStyles = {
  heading: {
    margin: 0,
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: "#0c0a09",
  },
  paragraph: {
    margin: "12px 0 0 0",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#57504d",
  },
  detailLabel: {
    margin: 0,
    fontSize: "11px",
    lineHeight: "16px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#a39c98",
  },
  detailValue: {
    margin: "3px 0 0 0",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#0c0a09",
    whiteSpace: "pre-wrap" as const,
  },
} as const;
