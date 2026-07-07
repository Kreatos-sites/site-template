import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

/**
 * BLOQUE: cta-band-horizontal-blur-stagger-dual-action — banda horizontal de
 * conversión de ancho completo con un halo decorativo desenfocado de fondo y
 * dos acciones (primaria + secundaria) que entran en stagger. Pensado como
 * cierre de página o quiebre entre secciones cuando el sitio necesita pedir
 * la acción sin desviarse a un formulario o panel con borde.
 *
 * ns esperado:
 *   { eyebrow: string, title: string, description: string,
 *     primaryCta: { label: string, href: string },
 *     secondaryCta: { label: string, href: string } }
 */
export function CtaBandHorizontalBlurStaggerDualAction({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link
              href={t("primaryCta.href")}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t("primaryCta.label")}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={t("secondaryCta.href")}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t("secondaryCta.label")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
