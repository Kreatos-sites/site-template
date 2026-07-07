import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { ShieldCheck, Clock, Layers, type LucideIcon } from "lucide-react";

type FaqItem = { id: string; question: string; answer: string; category: string };
type Stat = { icon: string; value: string; label: string };

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  layers: Layers,
};

export function FaqSidebarEditorialIndexedSticky({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const faqs = t.raw("faqs") as FaqItem[];
  const stats = t.raw("stats") as Stat[];

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-px border-y border-border sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = ICONS[stat.icon] ?? ShieldCheck;
            return (
              <Reveal key={index} delay={index * 60}>
                <div className="flex items-center gap-4 bg-card px-6 py-5">
                  <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
                  <div className="flex flex-col leading-tight">
                    <span className="font-display text-2xl text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <aside className="lg:col-span-3">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {t("indexLabel")}
                </p>
                <nav className="mt-5">
                  <ul className="flex flex-col border-l border-border">
                    {categories.map((category, index) => (
                      <li key={category}>
                        <a
                          href={`#${faqs.find((f) => f.category === category)?.id}`}
                          className="group -ml-px flex items-center gap-3 border-l-2 border-transparent py-2.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none"
                        >
                          <span className="text-xs text-primary tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{category}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Reveal>
          </aside>

          <div className="flex flex-col divide-y divide-border lg:col-span-9">
            {faqs.map((faq, index) => (
              <Reveal key={faq.id} delay={index * 60}>
                <details
                  id={faq.id}
                  className="group scroll-mt-28 py-6 first:pt-0 last:pb-0"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 focus-visible:outline-none">
                    <div>
                      <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                        {faq.category}
                      </span>
                      <h3 className="mt-2 font-display text-lg leading-snug text-balance text-foreground">
                        {faq.question}
                      </h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-sm text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
