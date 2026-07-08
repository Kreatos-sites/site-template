import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { User, Sparkle } from "lucide-react";

type FaqTurn = { question: string; answer: string };

export function FaqChatBubbleConversationPattern({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const turns = t.raw("turns") as FaqTurn[];

  return (
    <section className="relative border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_35%,transparent_100%)] opacity-60"
      />

      <div className="relative mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {turns.map((turn, index) => (
            <Reveal key={index} delay={index * 60}>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-secondary text-foreground">
                    <User className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="max-w-[85%] rounded-lg rounded-tl-none border border-border bg-secondary px-5 py-3.5 sm:max-w-[70%]">
                    <p className="text-sm leading-relaxed text-foreground">
                      {turn.question}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-end gap-3">
                  <div className="max-w-[85%] rounded-lg rounded-tr-none bg-primary px-5 py-3.5 sm:max-w-[70%]">
                    <p className="text-sm leading-relaxed text-primary-foreground">
                      {turn.answer}
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Sparkle className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
