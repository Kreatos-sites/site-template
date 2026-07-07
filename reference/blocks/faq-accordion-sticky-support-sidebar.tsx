import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  PlusIcon,
  ChatCircleDotsIcon,
} from "@phosphor-icons/react/dist/ssr";

type FaqItem = { question: string; answer: string };
type Channel = { icon: string; label: string; value: string; href: string };

const CHANNEL_ICONS: Record<string, typeof EnvelopeSimpleIcon> = {
  email: EnvelopeSimpleIcon,
  phone: PhoneIcon,
  chat: ChatCircleDotsIcon,
};

export function FaqAccordionStickySupportSidebar({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqItem[];
  const channels = t.raw("sidebar.channels") as Channel[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <ul className="mt-10 flex flex-col divide-y divide-border border-t border-border">
              {items.map((item, index) => (
                <li key={item.question} className="contents">
                  <Reveal delay={index * 60}>
                    <details className="group py-2">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <span className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                          {item.question}
                        </span>
                        <PlusIcon
                          className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                          weight="bold"
                        />
                      </summary>
                      <p className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </details>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="lg:sticky lg:top-28">
                <div className="flex flex-col gap-6 rounded-md border border-border bg-card p-8">
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                    </span>
                    <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {t("sidebar.status")}
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-xl text-foreground">
                      {t("sidebar.title")}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {t("sidebar.description")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-border pt-6">
                    {channels.map((channel) => {
                      const Icon = CHANNEL_ICONS[channel.icon] ?? EnvelopeSimpleIcon;
                      return (
                        <a
                          key={channel.label}
                          href={channel.href}
                          className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                        >
                          <Icon className="size-4 shrink-0 text-primary" weight="regular" />
                          <span className="flex flex-col">
                            <span className="text-xs text-muted-foreground">
                              {channel.label}
                            </span>
                            <span>{channel.value}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>

                  <p className="border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                    {t("sidebar.hours")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
