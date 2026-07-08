import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";

type Position = {
  title: string;
  department: string;
  location: string;
  type: string;
  href: string;
};

export function CareersOpenPositionsDenseListDark({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const positions = t.raw("positions") as Position[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/70 text-pretty">
            {t("description")}
          </p>
        </Reveal>

        {positions.length > 0 ? (
          <ul className="mt-14 flex flex-col border-t border-background/15">
            {positions.map((position, index) => (
              <li key={position.title} className="border-b border-background/15">
                <Reveal delay={index * 40}>
                  <a
                    href={position.href}
                    className="group grid grid-cols-1 items-center gap-x-6 gap-y-2 px-2 py-5 transition-colors hover:bg-background/[0.06] focus-visible:bg-background/[0.06] focus-visible:outline-none sm:grid-cols-[1.6fr_1fr_1fr_0.8fr_auto] sm:gap-y-0 sm:px-4"
                  >
                    <span className="font-display text-base tracking-tight text-background sm:text-lg">
                      {position.title}
                    </span>
                    <span className="text-xs text-background/60 sm:text-sm">
                      {position.department}
                    </span>
                    <span className="text-xs text-background/60 sm:text-sm">
                      {position.location}
                    </span>
                    <span className="text-xs text-background/60 sm:text-sm">
                      {position.type}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-4 shrink-0 text-background/40 transition-transform group-hover:translate-x-1 group-hover:text-primary sm:justify-self-end"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal delay={40}>
            <p className="mt-14 border-t border-background/15 pt-10 text-sm text-background/60">
              {t("emptyStateLabel")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
