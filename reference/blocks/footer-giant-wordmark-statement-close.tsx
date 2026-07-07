import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Linkedin01Icon,
  CameraIcon,
  NewTwitterIcon,
  Facebook01Icon,
} from "@hugeicons/core-free-icons";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };
type SocialLink = { icon: string; label: string; href: string };

const SOCIAL_ICONS: Record<string, IconSvgElement> = {
  linkedin: Linkedin01Icon,
  instagram: CameraIcon,
  twitter: NewTwitterIcon,
  facebook: Facebook01Icon,
};

export function FooterGiantWordmarkStatementClose({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const columns = t.raw("columns") as FooterColumn[];
  const socialLinks = t.raw("socialLinks") as SocialLink[];
  const legalLinks = t.raw("legalLinks") as FooterLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="max-w-2xl font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2] tracking-tight text-balance text-foreground">
            {t("statement")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-14 grid grid-cols-2 gap-10 border-t border-border pt-12 sm:grid-cols-4">
            {columns.map((column, i) => (
              <div key={i}>
                <h3 className="font-display text-sm text-foreground">{column.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-secondary-foreground">{t("statusLabel")}</span>
            </div>

            <ul className="flex items-center gap-3">
              {socialLinks.map((social, i) => {
                const icon = SOCIAL_ICONS[social.icon] ?? Linkedin01Icon;
                return (
                  <li key={i}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <HugeiconsIcon icon={icon} className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p
            aria-hidden="true"
            className="mt-8 select-none text-center font-display leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--foreground)] [font-size:clamp(3.5rem,14vw,11rem)]"
          >
            {t("wordmark")}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>{t("copyright")}</p>
            <ul className="flex items-center gap-6">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
