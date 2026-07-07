import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Globe,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Stat = {
  icon: string;
  value: string;
  label: string;
};

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

type Faq = {
  question: string;
  answer: string;
};

const STAT_ICONS: Record<string, LucideIcon> = {
  users: Users,
  trending: TrendingUp,
  clock: Clock,
  shield: ShieldCheck,
};

const FEATURE_ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  chart: BarChart3,
};

/**
 * Página SaaS ensamblada en un solo bloque: intro (encabezado + CTAs),
 * franja de logos de clientes, banda de cifras dedicada, features,
 * testimonio, planes de precio y FAQ, cerrando con una llamada a la acción.
 * Un solo <h2> (el título de la intro); las subsecciones usan <h3>.
 */
export function LandingSaasAssembledWithStatsBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const logos = t.raw("logos") as string[];
  const stats = t.raw("stats") as Stat[];
  const features = t.raw("features") as Feature[];
  const testimonial = t.raw("testimonial") as Testimonial;
  const pricingPlans = t.raw("pricingPlans") as PricingPlan[];
  const faqs = t.raw("faqs") as Faq[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Intro */}
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </Reveal>

        {/* Social proof */}
        <Reveal delay={80}>
          <div className="mt-16 border-t border-border pt-10">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {t("logosLabel")}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
              {logos.map((logo) => (
                <li
                  key={logo}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <Globe className="size-4 text-primary" aria-hidden="true" />
                  {logo}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Stats band */}
        <div className="mt-16">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = STAT_ICONS[stat.icon] ?? TrendingUp;
              return (
                <li key={stat.label} className="contents">
                  <Reveal delay={index * 60}>
                    <article className="flex h-full flex-col gap-6 bg-card p-8">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-tight text-foreground tabular-nums">
                          {stat.value}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Features */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-2xl text-foreground">
              {t("featuresTitle")}
            </h3>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = FEATURE_ICONS[feature.icon] ?? Zap;
              return (
                <li key={feature.title} className="contents">
                  <Reveal delay={index * 60}>
                    <article className="flex h-full flex-col gap-4 bg-card p-8">
                      <Icon
                        className="size-5 text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <p className="font-display text-lg text-foreground">
                        {feature.title}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Testimonial */}
        <Reveal>
          <figure className="mt-20 rounded-sm border border-border bg-card p-10">
            <blockquote className="font-display text-xl leading-snug text-balance text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{testimonial.name}</span>
              {" — "}
              {testimonial.role}, {testimonial.company}
            </figcaption>
          </figure>
        </Reveal>

        {/* Pricing */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-2xl text-foreground">
              {t("pricingTitle")}
            </h3>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <li key={plan.name} className="contents">
                <Reveal delay={index * 60}>
                  <article
                    className={cn(
                      "flex h-full flex-col gap-6 rounded-sm border p-8",
                      plan.highlighted
                        ? "border-primary bg-card ring-1 ring-primary"
                        : "border-border bg-card",
                    )}
                  >
                    <div>
                      <p className="font-display text-lg text-foreground">
                        {plan.name}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <p className="font-display text-3xl tracking-tight text-foreground">
                      {plan.price}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        {plan.period}
                      </span>
                    </p>
                    <ul className="flex flex-1 flex-col gap-3">
                      {plan.features.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className={cn(
                        "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
                        plan.highlighted
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-foreground",
                      )}
                    >
                      {plan.cta}
                    </a>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-2xl text-foreground">
              {t("faqTitle")}
            </h3>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 40}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-lg text-foreground marker:content-none">
                    {faq.question}
                    <span className="shrink-0 text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Reveal>
          <div className="mt-20 flex flex-col items-start gap-6 rounded-sm border border-border bg-card p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-2xl text-foreground">
                {t("finalCtaTitle")}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("finalCtaSubtitle")}
              </p>
            </div>
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {t("finalCtaButton")}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
