import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { RiMailLine, RiPhoneLine, RiAddLine } from "@remixicon/react";

type FaqItem = { question: string; answer: string };

export function FaqSupportCtaHybrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                  {t("title")}
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {t("description")}
                </p>

                <div className="mt-8 flex flex-col gap-5 rounded-md border border-border bg-card p-7">
                  <p className="font-display text-lg text-foreground">
                    {t("cta.title")}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t("cta.description")}
                  </p>
                  <div className="flex flex-col gap-3 border-t border-border pt-5">
                    <a
                      href={`mailto:${t("cta.email")}`}
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <RiMailLine className="size-4 text-primary" />
                      {t("cta.email")}
                    </a>
                    <a
                      href={`tel:${t("cta.phone")}`}
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <RiPhoneLine className="size-4 text-primary" />
                      {t("cta.phone")}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col divide-y divide-border border-t border-border">
              {items.map((item, index) => (
                <li key={item.question} className="contents">
                  <Reveal delay={index * 60}>
                    <details className="group py-2">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <span className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                          {item.question}
                        </span>
                        <RiAddLine className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <p className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </details>
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
