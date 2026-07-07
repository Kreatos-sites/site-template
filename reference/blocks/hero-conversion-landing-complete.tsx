import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  ArrowRight,
  ClipboardList,
  FileSearch,
  Rocket,
  ShieldCheck,
  Gauge,
  Users,
  type LucideIcon,
} from "lucide-react";

type Metric = { value: string; label: string };
type Feature = { icon: string; title: string; description: string };
type Step = { title: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  gauge: Gauge,
  users: Users,
  search: FileSearch,
  clipboard: ClipboardList,
  rocket: Rocket,
};

export function HeroConversionLandingComplete({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];
  const features = t.raw("features") as Feature[];
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Hero centrado con captura de correo */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="hero-conversion-email" className="sr-only">
                {t("form.emailLabel")}
              </label>
              <input
                id="hero-conversion-email"
                type="email"
                required
                placeholder={t("form.emailPlaceholder")}
                className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium tracking-tight text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {t("form.cta")}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-4 text-xs text-muted-foreground">{t("form.note")}</p>
          </Reveal>
        </div>

        {/* Métricas clave */}
        <Reveal delay={300}>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 border-y border-border py-8 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-display text-3xl tracking-tight text-primary tabular-nums">
                  {metric.value}
                </dd>
                <p className="mt-2 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Grid de capacidades */}
        <div className="mt-20 text-center">
          <Reveal>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              {t("featuresTitle")}
            </h3>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = ICONS[feature.icon] ?? ShieldCheck;
              return (
                <li key={i} className="contents">
                  <Reveal delay={i * 60}>
                    <article className="flex h-full flex-col items-center gap-4 bg-card p-8 text-center">
                      <Icon
                        aria-hidden="true"
                        className="size-6 text-primary"
                        strokeWidth={1.75}
                      />
                      <div>
                        <p className="font-display text-base text-foreground">
                          {feature.title}
                        </p>
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

        {/* Cómo funciona */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl tracking-tight text-foreground">
              {t("stepsTitle")}
            </h3>
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className="relative border-t border-primary pt-5">
                  <span className="font-display text-sm text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-display text-lg text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Testimonio destacado */}
        <Reveal delay={120}>
          <figure className="mx-auto mt-20 max-w-2xl rounded-lg border border-border bg-card p-10 text-center">
            <blockquote>
              <p className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                {t("testimonial.quote")}
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              <SmartImage
                src={t("testimonial.avatar")}
                alt={t("testimonial.avatarAlt")}
                className="aspect-square size-12 rounded-full"
              />
              <span className="text-left">
                <span className="block text-sm font-medium text-foreground">
                  {t("testimonial.name")}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {t("testimonial.role")}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Banda de waitlist */}
        <Reveal delay={160}>
          <div className="mt-20 flex flex-col items-center gap-6 rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-xl tracking-tight">
                {t("waitlist.title")}
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                {t("waitlist.description")}
              </p>
            </div>
            <form className="flex w-full max-w-sm shrink-0 flex-col gap-3 sm:flex-row">
              <label htmlFor="hero-conversion-waitlist-email" className="sr-only">
                {t("waitlist.emailLabel")}
              </label>
              <input
                id="hero-conversion-waitlist-email"
                type="email"
                required
                placeholder={t("waitlist.emailPlaceholder")}
                className="w-full rounded-md border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium tracking-tight text-primary transition-colors hover:bg-primary-foreground/90 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
              >
                {t("waitlist.cta")}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
