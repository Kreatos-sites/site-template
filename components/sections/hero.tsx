import { ArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { GoogleRatingBadge } from "@/components/shared/google-rating-badge";
import { HeroItem, HeroStagger, Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import type { SectionOf } from "@/lib/config";
import { cn } from "@/lib/utils";
import config from "@/site.config";

type Stat = { value: string; label: string };

// `onDark` = el hero va SOBRE la imagen full-bleed (overlay oscuro). Ahí el
// texto y el CTA secundario tienen que ser claros: los tokens por defecto son
// del modo claro (foreground oscuro) e invisibilizan el copy sobre la foto. El
// botón primario se invierte (relleno claro/texto primario) para no fundirse
// con el overlay, igual que en cta-bg-image.
function HeroCtas({
  primary,
  secondary,
  onDark = false,
}: {
  primary: string;
  secondary: string;
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Button
        asChild
        size="lg"
        className={
          onDark
            ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            : undefined
        }
      >
        <a href="#contacto">{primary}</a>
      </Button>
      <a
        href="#servicios"
        className={cn(
          "group inline-flex items-center gap-2 text-sm font-medium",
          onDark ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {secondary}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function HeroMeta() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="size-4" aria-hidden="true" />
        {config.business.address.city}, {config.business.address.state}
      </span>
      <GoogleRatingBadge />
    </div>
  );
}

export function Hero({ variant = "editorial", image, ns }: SectionOf<"hero">) {
  const t = useTranslations(ns ?? "hero");
  const stats = t.raw("stats") as Stat[];

  if (variant === "full-bleed") {
    return (
      <section className="relative flex min-h-[82svh] items-end">
        {image && (
          <SmartImage
            src={image}
            alt={t("imageAlt")}
            priority
            sizes="100vw"
            className="absolute inset-0"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:var(--hero-overlay)]"
        />
        {/* text-primary-foreground: el copy va SOBRE el overlay oscuro, así que
            hereda el color claro por defecto (el eyebrow/subtítulo solo bajan
            opacidad). Sin esto, el h1 caía a `foreground` oscuro e invisible. */}
        <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-16 text-primary-foreground lg:px-8">
          <HeroStagger>
            <HeroItem>
              <p className="mb-4 text-xs font-medium tracking-[0.25em] text-primary-foreground/75 uppercase">
                {t("eyebrow")}
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="max-w-3xl font-display text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] leading-[1.02] tracking-tight text-balance">
                {t("title")}
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
                {t("subtitle")}
              </p>
            </HeroItem>
            <HeroItem className="mt-9">
              <HeroCtas
                primary={t("primaryCta")}
                secondary={t("secondaryCta")}
                onDark
              />
            </HeroItem>
          </HeroStagger>
        </div>
      </section>
    );
  }

  if (variant === "stat-led") {
    return (
      <section className="pt-(--section-gap) pb-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <HeroStagger>
            <HeroItem>
              <p className="mb-4 text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="max-w-4xl font-display text-[clamp(2.5rem,1.6rem+4vw,4.75rem)] leading-[1.02] tracking-tight text-balance">
                {t("title")}
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                {t("subtitle")}
              </p>
            </HeroItem>
            <HeroItem className="mt-9">
              <HeroCtas primary={t("primaryCta")} secondary={t("secondaryCta")} />
            </HeroItem>
          </HeroStagger>
          <Reveal delay={150}>
            <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-background px-6 py-8">
                  <dd className="font-display text-4xl text-primary tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    );
  }

  if (variant === "split-image") {
    return (
      <section className="pt-(--section-gap) pb-(--section-gap)">
        <div
          className={
            image
              ? "mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8"
              : // Sin imagen: el titular ocupa el ancho, nada de media pantalla vacía.
                "mx-auto w-full max-w-4xl px-6 lg:px-8"
          }
        >
          <HeroStagger>
            <HeroItem>
              <p className="mb-4 text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="font-display text-[clamp(2.25rem,1.5rem+3.2vw,3.75rem)] leading-[1.05] tracking-tight text-balance">
                {t("title")}
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 text-lg text-muted-foreground">{t("subtitle")}</p>
            </HeroItem>
            <HeroItem className="mt-9">
              <HeroCtas primary={t("primaryCta")} secondary={t("secondaryCta")} />
            </HeroItem>
            <HeroItem className="mt-10">
              <HeroMeta />
            </HeroItem>
          </HeroStagger>
          {image && (
            <Reveal delay={120}>
              <SmartImage
                src={image}
                alt={t("imageAlt")}
                priority
                className="aspect-[4/5] w-full rounded-lg"
              />
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  // editorial (default): titular dominante a la izquierda, imagen enmarcada
  // y desplazada a la derecha. Asimetría deliberada.
  return (
    <section className="overflow-x-clip pt-[calc(var(--section-gap)*0.8)] pb-(--section-gap)">
      <div
        className={
          image
            ? "mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8"
            : // Sin imagen: una sola columna al ancho del titular — sin hueco muerto.
              "mx-auto w-full max-w-4xl px-6 lg:px-8"
        }
      >
        <div className={image ? "lg:col-span-7" : ""}>
          <HeroStagger>
            <HeroItem>
              <p className="mb-5 text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="font-display text-[clamp(2.5rem,1.5rem+4.5vw,4.75rem)] leading-[1.02] tracking-tight text-balance">
                {t("title")}
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
            </HeroItem>
            <HeroItem className="mt-10">
              <HeroCtas primary={t("primaryCta")} secondary={t("secondaryCta")} />
            </HeroItem>
            <HeroItem className="mt-14 border-t border-border pt-6">
              <HeroMeta />
            </HeroItem>
          </HeroStagger>
        </div>
        {image && (
          <div className="lg:col-span-5 lg:pl-6">
            <Reveal delay={150} className="lg:mt-10">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -top-4 -right-4 hidden h-full w-full border border-primary/40 lg:block"
                />
                <SmartImage
                  src={image}
                  alt={t("imageAlt")}
                  priority
                  className="relative aspect-[4/5] w-full"
                />
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
