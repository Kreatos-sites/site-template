import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ArrowRight,
  Calendar,
  Clock,
  Video,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

type AgendaItem = {
  icon: string;
  label: string;
};

const ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  clock: Clock,
  video: Video,
  agenda: ListChecks,
};

export function CallBookingClosure({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const agenda = t.raw("agenda") as AgendaItem[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-primary py-(--section-gap) text-primary-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-primary-foreground/15" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-base text-primary-foreground/70 text-pretty sm:text-lg">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <a
              href="#contacto"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            >
              {t("cta")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="rounded-sm border border-primary-foreground/15 bg-primary-foreground/5 p-8">
            <p className="text-xs font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">
              {t("agendaTitle")}
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {agenda.map((item, i) => {
                const Icon = ICONS[item.icon] ?? Calendar;
                return (
                  <li key={i} className="flex items-center gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10">
                      <Icon
                        aria-hidden="true"
                        className="size-4 text-primary-foreground"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-primary-foreground/85">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
