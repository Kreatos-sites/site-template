import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiMailLine,
  RiBuilding2Line,
  RiMessage3Line,
  RiTimeLine,
  RiArrowRightLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Channel = {
  icon: string;
  title: string;
  value: string;
  note: string;
};

const ICONS: Record<string, RemixiconComponentType> = {
  mail: RiMailLine,
  office: RiBuilding2Line,
  chat: RiMessage3Line,
  hours: RiTimeLine,
};

const OFFSETS = ["", "sm:mt-10", "sm:mt-0", "sm:mt-14"];

export function ContactPatternTintedStaggeredCards({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const channels = t.raw("channels") as Channel[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="relative overflow-hidden bg-secondary">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background-image:radial-gradient(color-mix(in_oklab,var(--color-foreground)_18%,transparent)_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, i) => {
              const Icon = ICONS[channel.icon] ?? RiMailLine;
              const offset = OFFSETS[i % OFFSETS.length];
              return (
                <Reveal key={channel.title} delay={i * 60}>
                  <article
                    className={`flex h-full flex-col gap-4 rounded-md border border-border bg-card p-6 shadow-sm ${offset}`}
                  >
                    <span className="flex size-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-base text-foreground">
                      {channel.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground">
                      {channel.value}
                    </p>
                    <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
                      {channel.note}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={channels.length * 60 + 40}>
          <div className="relative border-t border-border bg-primary">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <p className="text-sm font-medium text-primary-foreground">
                {t("cta.label")}
              </p>
              <a
                href={t("cta.href")}
                className="inline-flex items-center gap-2 rounded-sm bg-background px-6 py-3 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {t("cta.action")}
                <RiArrowRightLine className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
