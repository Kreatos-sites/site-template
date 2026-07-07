import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import {
  EnvelopeSimpleIcon,
  BuildingOfficeIcon,
  ChatCircleIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type Channel = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

const ICONS: Record<string, Icon> = {
  email: EnvelopeSimpleIcon,
  office: BuildingOfficeIcon,
  chat: ChatCircleIcon,
};

export function ContactCardsGridHoverLiftInlineForm({ ns }: { ns: string }) {
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
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {channels.map((channel, i) => {
            const Icon = ICONS[channel.icon] ?? EnvelopeSimpleIcon;
            return (
              <Reveal key={channel.label} delay={i * 60}>
                <a
                  href={channel.href}
                  className={cn(
                    "group flex h-full flex-col justify-between gap-8 rounded-sm border border-border bg-card p-6",
                    "transition-transform duration-200 hover:-translate-y-1 hover:border-primary/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="size-5 text-primary" weight="regular" />
                    <ArrowUpRightIcon className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{channel.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{channel.value}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={channels.length * 60}>
          <form className="mt-6 grid grid-cols-1 gap-4 rounded-sm border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr_auto] lg:items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-cards-name" className="text-xs font-medium text-muted-foreground">
                {t("form.nameLabel")}
              </label>
              <input
                id="contact-cards-name"
                type="text"
                placeholder={t("form.namePlaceholder")}
                className="h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-cards-email" className="text-xs font-medium text-muted-foreground">
                {t("form.emailLabel")}
              </label>
              <input
                id="contact-cards-email"
                type="email"
                placeholder={t("form.emailPlaceholder")}
                className="h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-cards-message" className="text-xs font-medium text-muted-foreground">
                {t("form.messageLabel")}
              </label>
              <input
                id="contact-cards-message"
                type="text"
                placeholder={t("form.messagePlaceholder")}
                className="h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="h-10 rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {t("form.submit")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
