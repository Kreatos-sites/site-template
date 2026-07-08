import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { MapPin, Phone, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CONTACT_ICONS: Record<string, LucideIcon> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
};

type Contact = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

type LegalLink = {
  label: string;
  href: string;
};

export function FooterWarmSecondaryEditorialPullquote({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const contacts = t.raw("contacts") as Contact[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_minmax(0,1fr)]">
          <Reveal>
            <blockquote className="max-w-xl">
              <p className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] tracking-tight text-balance text-secondary-foreground">
                {t("pullQuote")}
              </p>
              <cite className="mt-6 block text-sm tracking-[0.1em] text-muted-foreground uppercase not-italic">
                {t("attribution")}
              </cite>
            </blockquote>
          </Reveal>

          <Reveal delay={80}>
            <ul className="flex flex-col gap-6 border-t border-border/70 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              {contacts.map((contact, i) => {
                const Icon = CONTACT_ICONS[contact.icon] ?? MapPin;
                return (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm bg-background text-primary">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        {contact.label}
                      </p>
                      <a
                        href={contact.href}
                        className="mt-1 block text-sm leading-relaxed text-secondary-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
          <p>{t("copyright")}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
