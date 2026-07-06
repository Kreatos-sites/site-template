import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { SectionRenderer } from "@/components/shared/section-renderer";
import config from "@/site.config";

/**
 * Páginas interiores declaradas en config.pages (motor: no tocar).
 * Cada página se sirve en /<slug> (default) o /<locale>/<slug>, prerenderizada
 * en build para cada locale; cualquier slug no declarado responde 404
 * (dynamicParams = false). navbar y footer se heredan de config.sections.
 */
export const dynamicParams = false;

type PageParams = { params: Promise<{ locale: string; page: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    (config.pages ?? []).map((p) => ({ locale, page: p.slug })),
  );
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { page } = await params;
  const pageConfig = (config.pages ?? []).find((p) => p.slug === page);
  if (!pageConfig) return {};

  return {
    title: pageConfig.title,
    description: pageConfig.description,
    alternates: {
      canonical: `https://${config.seo.domain}/${pageConfig.slug}`,
    },
    openGraph: {
      title: pageConfig.title,
      description: pageConfig.description,
    },
  };
}

export default async function InteriorPage({ params }: PageParams) {
  const { locale, page } = await params;
  setRequestLocale(locale);
  const pageConfig = (config.pages ?? []).find((p) => p.slug === page);
  if (!pageConfig) notFound();

  const navbar = config.sections.find((s) => s.id === "navbar");
  const footer = config.sections.find((s) => s.id === "footer");
  const sections = [
    ...(navbar ? [navbar] : []),
    ...pageConfig.sections,
    ...(footer ? [footer] : []),
  ];

  return <SectionRenderer sections={sections} />;
}
