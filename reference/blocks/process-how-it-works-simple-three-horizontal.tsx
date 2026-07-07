import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ClipboardList,
  Wrench,
  PackageCheck,
  PhoneCall,
  FileSignature,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  wrench: Wrench,
  package: PackageCheck,
  phone: PhoneCall,
  signature: FileSignature,
  truck: Truck,
};

export function ProcessHowItWorksSimpleThreeHorizontal({ ns }: { ns: string }) {
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

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? ClipboardList;
            const isLast = i === steps.length - 1;
            return (
              <li key={i} className="relative">
                <Reveal delay={i * 80}>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className="size-6 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-6 right-[-1.25rem] hidden h-px w-8 bg-border sm:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
