import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight } from "lucide-react";

export function ContactHero({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Action = { label: string; value: string; href: string };
  const actions = t.raw("actions") as Action[];

  return (
    <section className="relative overflow-hidden bg-secondary py-(--section-gap) text-secondary-foreground">
      {/* Decorative oversized wash anchored to the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-secondary-foreground/15"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          {/* Left: the statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-balance">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-secondary-foreground/70 text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>
          </div>

          {/* Right: the contact rail as a stacked list of links */}
          <div className="lg:col-span-5">
            <ul className="flex flex-col divide-y divide-secondary-foreground/12 border-t border-secondary-foreground/12">
              {actions.map((action, index) => (
                <li key={action.href}>
                  <Reveal delay={index * 60}>
                    <a
                      href={action.href}
                      className="group flex items-baseline justify-between gap-6 py-6 transition-colors hover:text-primary"
                    >
                      <span className="flex flex-col gap-1">
                        <span className="text-xs font-medium tracking-[0.2em] text-secondary-foreground/50 uppercase">
                          {action.label}
                        </span>
                        <span className="font-display text-xl tracking-tight sm:text-2xl">
                          {action.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 shrink-0 translate-y-1 text-secondary-foreground/40 transition-transform duration-300 group-hover:-translate-y-0 group-hover:translate-x-1 group-hover:text-primary"
                      />
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
