import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import config from "@/site.config";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
        {config.business.name}
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">404</h1>
      <p className="mt-3 font-display text-xl">{t("title")}</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("body")}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t("back")}</Link>
      </Button>
    </main>
  );
}
