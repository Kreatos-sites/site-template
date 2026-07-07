import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  FileCheck2,
  LineChart,
  Link2,
  ListChecks,
  Rocket,
  ShieldCheck,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Stat = { value: string; label: string };
type Feature = { icon: string; title: string; description: string };
type Step = { icon: string; title: string; description: string };
type Testimonial = { quote: string; author: string; role: string };

const ICONS: Record<string, LucideIcon> = {
  chart: LineChart,
  bars: BarChart3,
  shield: ShieldCheck,
  file: FileCheck2,
  clock: Clock3,
  timer: Timer,
  checklist: ListChecks,
  users: Users,
  rocket: Rocket,
  link: Link2,
};

/**
 * Bloque compuesto tipo "landing de producto/preventa": hero centrado con
 * captura de correo inline, cifras clave, grid de características con
 * icono, línea de tiempo de cómo funciona, testimonio destacado y banda
 * final de registro a lista de espera, todo en un solo componente. Úsalo
 * para presentar una plataforma o software en fase de lanzamiento/acceso
 * anticipado de principio a fin.
 */
export function HeroCenteredEmailCaptureSaasCompleteLanding({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);

  const stats = t.raw("stats") as Stat[];
  const features = t.raw("features") as Feature[];
  const steps = t.raw("steps") as Step[];
  const testimonial = t.raw("testimonial") as Testimonial;

  return (
    <>
      {/* Hero con captura de correo */}
      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,4vw+1rem,4.25rem)] leading-[1.03] tracking-tight text-balance text-foreground">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <form
              action={t("formAction")}
              method="post"
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="hero-saas-landing-email-input" className="sr-only">
                {t("inputLabel")}
              </label>
              <input
                id="hero-saas-landing-email-input"
                type="email"
                name="email"
                required
                placeholder={t("inputPlaceholder")}
                className="w-full rounded-sm border border-border bg-card px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {t("cta")}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </Reveal>

          <Reveal delay={300}>
            <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              {t("legal")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cifras clave */}
      <section className="border-t border-y border-border bg-card py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal className="relative flex flex-col gap-10 md:flex-row md:items-stretch md:gap-0">
            <span
              aria-hidden="true"
              className="absolute top-0 -left-6 h-8 w-px bg-primary md:-left-8 md:h-full md:w-0.5"
            />
            <h2 className="sr-only">{t("statsEyebrow")}</h2>
            <p className="shrink-0 self-start pr-0 text-xs font-medium tracking-[0.25em] text-primary uppercase md:max-w-32 md:self-center md:pr-10">
              {t("statsEyebrow")}
            </p>
            <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 md:flex md:flex-1 md:grid-cols-none">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-center border-t border-border pt-6 first:border-t-0 first:pt-0 sm:border-t-0 sm:border-l sm:pt-0 sm:first:border-l-0 sm:px-8 md:flex-1 md:px-8 lg:px-10"
                >
                  <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-semibold tracking-tight text-balance text-foreground tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-3 text-sm leading-snug text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Características */}
      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("featuresEyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("featuresTitle")}
            </h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = ICONS[feature.icon] ?? ShieldCheck;
              return (
                <li key={feature.title} className="contents">
                  <Reveal delay={index * 60}>
                    <article className="flex h-full flex-col gap-6 bg-card p-8">
                      <Icon
                        aria-hidden="true"
                        className="size-5 text-primary"
                        strokeWidth={1.75}
                      />
                      <div>
                        <h3 className="font-display text-xl text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
      </section>

      {/* Cómo funciona */}
      <section className="border-t border-border py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("processEyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("processTitle")}
            </h2>
          </Reveal>
          <ol className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block"
            />
            {steps.map((step, index) => {
              const Icon = ICONS[step.icon] ?? Timer;
              return (
                <li key={step.title} className="relative">
                  <Reveal delay={index * 60}>
                    <div className="flex flex-col gap-5">
                      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                        <Icon
                          aria-hidden="true"
                          className="size-5 text-primary"
                          strokeWidth={1.75}
                        />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Testimonio destacado */}
      <section className="border-t border-border bg-card py-(--section-gap)">
        <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <figure className="flex flex-col items-center gap-8">
              <blockquote className="font-display text-[clamp(1.3rem,1vw+1.1rem,2rem)] leading-[1.3] tracking-tight text-balance text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-base font-semibold text-primary"
                >
                  {testimonial.author.charAt(0)}
                </span>
                <span className="flex flex-col text-left">
                  <span className="font-medium text-foreground">
                    {testimonial.author}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Banda final de registro */}
      <section className="border-t border-border bg-secondary py-(--section-gap) text-secondary-foreground">
        <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("waitlistEyebrow")}
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,1.4rem+3.6vw,4rem)] leading-[0.98] tracking-tight text-balance">
              {t("waitlistTitle")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-secondary-foreground/70">
              {t("waitlistDescription")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <form
              action={t("waitlistFormAction")}
              method="post"
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label
                htmlFor="hero-saas-landing-waitlist-input"
                className="sr-only"
              >
                {t("waitlistInputLabel")}
              </label>
              <input
                id="hero-saas-landing-waitlist-input"
                type="email"
                name="email"
                required
                placeholder={t("waitlistInputPlaceholder")}
                className="w-full rounded-sm border border-border bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {t("waitlistCta")}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-secondary-foreground/60">
              {t("waitlistLegal")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
