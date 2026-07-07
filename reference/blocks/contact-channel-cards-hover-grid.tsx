import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  MessageCircleIcon,
  type LucideIcon,
} from "lucide-react";

type Channel = {
  icon: string;
  title: string;
  description: string;
  value: string;
};

const ICONS: Record<string, LucideIcon> = {
  mail: MailIcon,
  phone: PhoneIcon,
  map: MapPinIcon,
  chat: MessageCircleIcon,
};

export function ContactChannelCardsHoverGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const channels = t.raw("channels") as Channel[];

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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, i) => {
            const Icon = ICONS[channel.icon] ?? MailIcon;
            return (
              <Reveal key={channel.title} delay={i * 60}>
                <article className="group flex h-full flex-col gap-5 rounded-md border border-border bg-card p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
                  <span className="flex size-11 items-center justify-center rounded-sm bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-foreground">
                      {channel.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {channel.description}
                    </p>
                  </div>
                  <p className="mt-auto text-sm font-medium text-primary">
                    {channel.value}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={channels.length * 60 + 40}>
          <form className="mt-6 flex flex-col gap-4 rounded-md border border-border bg-card p-7 sm:flex-row sm:items-end sm:gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="quickEmail"
                className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
              >
                {t("form.emailLabel")}
              </label>
              <input
                id="quickEmail"
                name="quickEmail"
                type="email"
                placeholder={t("form.emailPlaceholder")}
                aria-label={t("form.emailLabel")}
                className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("form.submitLabel")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
