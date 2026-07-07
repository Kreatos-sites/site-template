import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Plus } from "lucide-react";

export function FaqEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Item = { question: string; answer: string };
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div
                aria-hidden="true"
                className="mt-8 hidden h-px w-24 bg-border lg:block"
              />
            </div>
          </Reveal>

          <div className="-mt-2">
            {items.map((item, index) => (
              <Reveal key={index} delay={index * 60}>
                <details className="group border-b border-border/70 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 text-left">
                    <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground transition-colors group-open:text-primary sm:text-xl">
                      {item.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:border-primary group-open:text-primary"
                    >
                      <Plus className="size-4" strokeWidth={1.75} />
                    </span>
                  </summary>
                  <div className="max-w-2xl pr-16 pb-8 text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
