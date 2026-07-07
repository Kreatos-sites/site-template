import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

/**
 * Custom: encabezado de página interior (h1 + lead). El h1 de las páginas
 * interiores vive aquí (la home lleva su h1 en el hero). Copy 100% vía el `ns`.
 */
export function PageIntro({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="border-b border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <h1 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("lead")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
