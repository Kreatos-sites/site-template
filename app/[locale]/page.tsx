import { setRequestLocale } from "next-intl/server";

import { SectionRenderer } from "@/components/shared/section-renderer";
import config from "@/site.config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SectionRenderer sections={config.sections} />;
}
