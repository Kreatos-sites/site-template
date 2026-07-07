import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  RiPhoneLine,
  RiPencilRuler2Line,
  RiBuilding2Line,
  RiKey2Line,
  RiFileTextLine,
  RiTeamLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Step = { icon: string; title: string; description: string };

const ICONS: Record<string, RemixiconComponentType> = {
  phone: RiPhoneLine,
  design: RiPencilRuler2Line,
  build: RiBuilding2Line,
  key: RiKey2Line,
  contract: RiFileTextLine,
  team: RiTeamLine,
};

export function ProcessVisualJourneySteps({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

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

        <ol className="relative mt-16 max-w-2xl">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon] ?? RiBuilding2Line;
            const isLast = index === steps.length - 1;
            return (
              <li key={index} className="relative pb-14 pl-20 last:pb-0">
                {!isLast && (
                  <span
                    className="absolute top-14 left-7 w-px bg-border"
                    style={{ height: "calc(100% - 3rem)" }}
                    aria-hidden="true"
                  />
                )}
                <Reveal delay={index * 60}>
                  <span
                    className="absolute top-0 left-0 flex size-14 items-center justify-center rounded-full border border-border bg-card"
                    aria-hidden="true"
                  >
                    <Icon className="size-6 text-primary" />
                  </span>
                  <div>
                    <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                      {t("stepLabel")} {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl tracking-tight text-balance text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
