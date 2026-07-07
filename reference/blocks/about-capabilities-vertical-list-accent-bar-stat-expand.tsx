import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Scale,
  FileText,
  Handshake,
  Building2,
  Gavel,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

type Capability = {
  icon: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  detail: string;
};

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  scale: Scale,
  file: FileText,
  handshake: Handshake,
  building: Building2,
  gavel: Gavel,
};

export function AboutCapabilitiesVerticalListAccentBarStatExpand({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const capabilities = t.raw("capabilities") as Capability[];

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

        <ul className="mt-16 flex flex-col border-t border-border lg:mt-20">
          {capabilities.map((capability, i) => {
            const Icon = ICONS[capability.icon] ?? ShieldCheck;
            return (
              <li key={capability.title} className="border-b border-border">
                <Reveal delay={i * 60}>
                  <details className="group">
                    <summary
                      className={cn(
                        "relative flex cursor-pointer list-none items-center gap-6 py-6 pl-6 pr-4 marker:content-none",
                        "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-border before:transition-colors",
                        "group-open:before:bg-primary hover:before:bg-primary",
                      )}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-secondary">
                        <Icon className="size-5 text-primary" strokeWidth={1.75} />
                      </span>

                      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <div>
                          <h3 className="font-display text-lg text-foreground sm:text-xl">
                            {capability.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:hidden">
                            {capability.description}
                          </p>
                        </div>
                        <div className="hidden shrink-0 text-right sm:block">
                          <p className="font-display text-2xl text-foreground">
                            {capability.statValue}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {capability.statLabel}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                        strokeWidth={2}
                      />
                    </summary>

                    <div className="pb-8 pl-[4.75rem] pr-4">
                      <p className="hidden text-sm leading-relaxed text-muted-foreground sm:block">
                        {capability.description}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">
                        {capability.detail}
                      </p>
                      <div className="mt-4 flex items-baseline gap-2 sm:hidden">
                        <span className="font-display text-2xl text-foreground">
                          {capability.statValue}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {capability.statLabel}
                        </span>
                      </div>
                    </div>
                  </details>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
