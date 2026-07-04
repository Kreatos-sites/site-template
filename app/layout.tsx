import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { WhatsappButton } from "@/components/shared/whatsapp-button";
import { buildJsonLd } from "@/lib/jsonld";
import config from "@/site.config";
import { fontVariables } from "./fonts";
import "./globals.css";

const baseUrl = `https://${config.seo.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: config.seo.title,
    template: `%s | ${config.business.name}`,
  },
  description: config.seo.description,
  keywords: config.seo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: baseUrl,
    siteName: config.business.name,
    title: config.seo.title,
    description: config.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.title,
    description: config.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("common");
  const jsonLd = buildJsonLd(config);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body
        className="bg-background text-foreground font-body antialiased"
        data-density={config.design.density}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={config.design.defaultMode}
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <a
              href="#contenido"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
            >
              {t("skipToContent")}
            </a>
            {children}
            {config.flags.whatsappFloat && <WhatsappButton />}
            <Toaster position="bottom-center" />
          </NextIntlClientProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
