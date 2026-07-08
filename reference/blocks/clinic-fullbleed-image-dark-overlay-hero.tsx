import { useTranslations } from "next-intl";
import { CalendarCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * Hero de clínica a sangre completa: fotografía de médico atendiendo a un
 * paciente cubre todo el viewport, con un degradado oscuro de abajo hacia
 * arriba que garantiza contraste para el texto. Título y subtítulo alineados
 * a la izquierda sobre la imagen, sin tarjetas ni fondo sólido adicional,
 * seguidos de un único CTA para agendar cita. Úsalo como hero de apertura en
 * sitios de salud y clínicas que buscan un tono humano y confiable.
 */
export function ClinicFullbleedImageDarkOverlayHero({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden border-t border-border bg-foreground">
      <SmartImage
        src={t("image")}
        alt={t("imageAlt")}
        className="absolute inset-0 aspect-auto h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/10"
      />

      <div className="relative flex min-h-[92vh] w-full flex-col justify-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8 lg:pb-20">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-5 max-w-2xl">
            <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[1.02] font-semibold tracking-tight text-balance text-background">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={140} className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-background/80 text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-9">
            <a
              href={t("ctaHref")}
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
            >
              <CalendarCheck aria-hidden="true" className="size-4" />
              {t("cta")}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
