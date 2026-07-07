import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Rocket,
  Layers,
  ShieldCheck,
  Gauge,
  Quote,
  type LucideIcon,
} from "lucide-react";

type Stat = { value: string; label: string };

type Feature = { icon: string; title: string; description: string };

type Step = { title: string; description: string };

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
};

const ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  layers: Layers,
  shield: ShieldCheck,
  gauge: Gauge,
};

/**
 * Landing completa de startup: hero centrado con captura de correo, banda de
 * cifras clave, grid de capacidades, línea de tiempo de pasos y testimonio
 * destacado. Un solo bloque compuesto (varias filas apiladas) porque el
 * arquetipo fuente es una página entera, no una sola sección.
 */
export function StartupLandingWithKeyStats({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const features = t.raw("features") as Feature[];
  const steps = t.raw("steps") as Step[];
  const testimonial = t.raw("testimonial") as Testimonial;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      {/* Hero con captura de correo */}
      <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor={`${ns}-email`} className="sr-only">
              {t("emailLabel")}
            </label>
            <input
              id={`${ns}-email`}
              type="email"
              name="email"
              required
              placeholder={t("emailPlaceholder")}
              aria-label={t("emailLabel")}
              className="w-full flex-1 rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="submit"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("ctaLabel")}
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">{t("legal")}</p>
        </Reveal>
      </div>

      {/* Cifras clave */}
      <div className="mx-auto mt-16 w-full max-w-6xl px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
          {stats.map((stat, index) => (
            <li key={stat.label} className="contents">
              <Reveal delay={index * 60}>
                <article className="flex h-full flex-col gap-2 bg-card p-8 text-center">
                  <p className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-tight text-foreground tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Grid de capacidades */}
      <div className="mx-auto mt-20 w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("featuresEyebrow")}
          </p>
          <h3 className="mt-5 max-w-2xl font-display text-2xl leading-tight tracking-tight text-balance text-foreground">
            {t("featuresTitle")}
          </h3>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon] ?? Rocket;
            return (
              <li key={feature.title} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-4 bg-card p-8">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <h4 className="font-display text-lg text-foreground">
                        {feature.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Línea de tiempo de pasos */}
      <div className="mx-auto mt-20 w-full max-w-4xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("stepsEyebrow")}
          </p>
          <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight text-balance text-foreground">
            {t("stepsTitle")}
          </h3>
        </Reveal>
        <ol className="mt-10 flex flex-col gap-0">
          {steps.map((step, index) => (
            <li key={step.title} className="contents">
              <Reveal delay={index * 60}>
                <div
                  className={cn(
                    "flex gap-6 border-border py-6",
                    index !== steps.length - 1 && "border-b",
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border font-display text-sm text-primary tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-lg text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Testimonio destacado */}
      <div className="mx-auto mt-20 w-full max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <Quote className="mx-auto size-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-6 font-display text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
            {testimonial.quote}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <SmartImage
              src={testimonial.avatar}
              alt={testimonial.avatarAlt}
              className="aspect-square size-11 rounded-full border border-border"
            />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
