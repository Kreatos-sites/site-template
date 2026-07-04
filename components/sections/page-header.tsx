import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import type { SectionOf } from "@/lib/config";

/**
 * Encabezado de página interior: h1 display + párrafo lead.
 * Solo se usa dentro de config.pages; su `ns` es requerido por schema
 * (keys esperadas: `title` y `lead`). Mismo lenguaje visual que
 * section-heading, pero en jerarquía de h1.
 */
export function PageHeader({ ns }: SectionOf<"page-header">) {
  const t = useTranslations(ns);

  return (
    <section className="border-b border-border pt-[calc(var(--section-gap)*0.7)] pb-[calc(var(--section-gap)*0.6)]">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <h1 className="max-w-3xl font-display text-[clamp(2.25rem,1.4rem+3.5vw,4rem)] leading-[1.05] tracking-tight text-balance">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("lead")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
