import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { MessageCircle, Phone, Plus, ShieldCheck } from "lucide-react";

type FaqItem = { question: string; answer: string };

export function FaqAccordionContactCardAlongside({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-7">
            <ul className="flex flex-col divide-y divide-border border-t border-border">
              {items.map((item, index) => (
                <li key={item.question} className="contents">
                  <Reveal delay={index * 60}>
                    <details className="group py-2">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <span className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                          {item.question}
                        </span>
                        <Plus className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
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

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="flex flex-col gap-6 rounded-md border border-border bg-card p-7">
                <div className="flex items-center gap-4">
                  <SmartImage
                    src={t("card.avatar")}
                    alt={t("card.avatarAlt")}
                    className="aspect-square w-14 rounded-full"
                  />
                  <div>
                    <p className="font-display text-lg text-foreground">
                      {t("card.name")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("card.role")}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("card.description")}
                </p>

                <div className="flex flex-col gap-3 border-t border-border pt-6">
                  <a
                    href={t("card.primaryHref")}
                    className="flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <MessageCircle className="size-4" />
                    {t("card.primaryLabel")}
                  </a>
                  <a
                    href={`tel:${t("card.phone")}`}
                    className="flex items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <Phone className="size-4" />
                    {t("card.phone")}
                  </a>
                </div>

                <div className="flex items-start gap-2 border-t border-border pt-5">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t("card.responseTime")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
