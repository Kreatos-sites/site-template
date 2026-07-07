import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ClipboardList,
  Hammer,
  PackageCheck,
  Phone,
  FileText,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Step = { icon: string; title: string; description: string };

const ICONS: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  hammer: Hammer,
  package: PackageCheck,
  phone: Phone,
  file: FileText,
  truck: Truck,
};

export function ProcessHowItWorksHorizontalIconTrio({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? ClipboardList;
            return (
              <li key={i} className="contents">
                <Reveal delay={i * 60}>
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-3xl text-muted-foreground/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
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
