import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  FileText,
  MessageSquare,
  ClipboardCheck,
  Handshake,
  Send,
  Users,
  Laptop,
  Award,
} from "lucide-react";

const ICONS = {
  FileText,
  MessageSquare,
  ClipboardCheck,
  Handshake,
  Send,
  Users,
  Laptop,
  Award,
} as const;

type StepIcon = keyof typeof ICONS;

type Step = {
  number: string;
  icon: StepIcon;
  title: string;
  description: string;
};

export function CareersApplicationProcessWarmSteps({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="relative border-t border-border bg-secondary py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(currentColor_1.5px,transparent_1.5px)] [background-size:22px_22px] text-foreground"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon];
            const isLast = index === steps.length - 1;
            return (
              <li key={step.number} className="relative">
                <Reveal delay={index * 80}>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card">
                        <Icon className="size-5 text-primary" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-2xl text-primary/40">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
                {!isLast ? (
                  <div
                    aria-hidden="true"
                    className="absolute top-6 right-0 hidden h-px w-10 translate-x-full border-t-2 border-dotted border-primary/40 sm:block"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>

        <Reveal delay={steps.length * 80}>
          <div className="mt-16 flex justify-center">
            <a
              href={t("ctaHref")}
              className="inline-flex items-center justify-center rounded-sm border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("cta")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
