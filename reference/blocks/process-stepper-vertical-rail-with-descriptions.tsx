import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ClipboardList,
  FileSignature,
  Hammer,
  MessageSquare,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  diagnostico: MessageSquare,
  propuesta: ClipboardList,
  contrato: FileSignature,
  desarrollo: Hammer,
  entrega: PackageCheck,
};

export function ProcessStepperVerticalRailWithDescriptions({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <ol className="mt-16 flex max-w-2xl flex-col">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? ClipboardList;
            const isLast = i === steps.length - 1;
            return (
              <li key={i} className="relative flex gap-6 pb-12 last:pb-0">
                {!isLast ? (
                  <span aria-hidden="true" className="absolute top-12 left-6 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-border" />
                ) : null}
                <Reveal delay={i * 80}>
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                </Reveal>
                <Reveal delay={i * 80 + 40}>
                  <div className="pt-1.5">
                    <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("stepLabel", { number: i + 1 })}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
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
