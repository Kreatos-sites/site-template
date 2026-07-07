import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
// lucide-react ya no exporta iconos de marca (Globe/Camera/…): las redes
// se rinden con un icono neutro; el label del copy las distingue.
import { Globe, type LucideIcon } from "lucide-react";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  facebook: Globe,
  instagram: Globe,
  linkedin: Globe,
  twitter: Globe,
  youtube: Globe,
};

type SocialLink = {
  icon: string;
  label: string;
  href: string;
};

type NavLink = {
  label: string;
  href: string;
};

type NavColumn = {
  heading: string;
  links: NavLink[];
};

type LegalLink = {
  label: string;
  href: string;
};

export function FooterAsymmetricSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const social = t.raw("social") as SocialLink[];
  const columns = t.raw("columns") as NavColumn[];
  const legalLinks = t.raw("legalLinks") as LegalLink[];

  return (
    <footer className="border-t border-border bg-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="font-display text-2xl tracking-tight text-background">
                  {t("brandName")}
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
                  {t("description")}
                </p>
              </div>
              <ul className="flex flex-wrap items-center gap-3">
                {social.map((item, i) => {
                  const Icon = SOCIAL_ICONS[item.icon] ?? Globe;
                  return (
                    <li key={i}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        className="flex size-10 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors duration-300 hover:border-background/50 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                      >
                        <Icon className="size-4" strokeWidth={1.75} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {columns.map((column, columnIndex) => (
              <Reveal key={columnIndex} delay={columnIndex * 80}>
                <div>
                  <h3 className="font-display text-sm font-medium tracking-[0.2em] text-background/50 uppercase">
                    {column.heading}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-4">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm leading-relaxed text-background/80 transition-colors duration-300 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 bg-background/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-4 px-6 py-6 text-xs text-background/60 sm:flex-row sm:justify-between lg:px-8">
          <p>{t("copyright")}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
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
