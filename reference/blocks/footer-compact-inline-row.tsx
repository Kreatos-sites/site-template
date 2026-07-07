import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type NavLink = { label: string; href: string };
type SocialLink = { icon: string; label: string; href: string };

const SOCIAL_ICONS: Record<string, Icon> = {
  facebook: FacebookLogoIcon,
  instagram: InstagramLogoIcon,
  linkedin: LinkedinLogoIcon,
};

export function FooterCompactInlineRow({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];
  const socials = t.raw("socials") as SocialLink[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <span className="font-display text-base text-foreground">{t("brand")}</span>

            <nav aria-label={t("navLabel")} className="order-3 w-full lg:order-none lg:w-auto">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-3">
                {socials.map((social, i) => {
                  const SocialIcon = SOCIAL_ICONS[social.icon] ?? LinkedinLogoIcon;
                  return (
                    <li key={i}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <SocialIcon className="size-4" weight="regular" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <span className="hidden h-4 w-px bg-border lg:block" aria-hidden="true" />
              <p className="text-sm whitespace-nowrap text-muted-foreground">{t("copyright")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
