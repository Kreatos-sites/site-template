import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";

type FaqPair = { question: string; answer: string };

export function FaqColumns({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqPair[];

  return (
    <section className="border-t border-border py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <header className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                  {t("title")}
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-8 hidden h-px w-16 bg-primary/40 lg:block"
                />
              </div>
            </Reveal>
          </header>

          <div className="lg:col-span-8">
            <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {items.map((item, index) => (
                <Reveal key={item.question} delay={index * 60}>
                  <div className="relative pt-7">
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 font-display text-xs tabular-nums tracking-[0.2em] text-muted-foreground/70"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute top-0 right-0 h-px w-full bg-border"
                    />
                    <dt className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                      {item.question}
                    </dt>
                    <dd className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {item.answer}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
