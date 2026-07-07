import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Briefcase,
  Bird,
  Globe,
  Camera,
  Mail,
  Sun,
  Moon,
  Monitor,
  type LucideIcon,
} from "lucide-react";

/**
 * Footer tipo blueprint: cuadrícula geométrica con celdas delimitadas por
 * bordes que organiza redes sociales, suscripción a newsletter y un selector
 * de tema (claro/oscuro/sistema) resuelto con inputs de radio + CSS puro
 * (sin JS de cliente), inspirado en el arquetipo footer-7 sin copiar su
 * código.
 */

type SocialLink = { icon: string; href: string; label: string };
type LinkItem = { label: string; href: string };
type LinkColumn = { title: string; links: LinkItem[] };

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Briefcase,
  twitter: Bird,
  facebook: Globe,
  instagram: Camera,
  email: Mail,
};

export function FooterGridBorderedCellsNewsletter({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const socials = t.raw("socials") as SocialLink[];
  const columns = t.raw("columns") as LinkColumn[];
  const legalLinks = t.raw("legalLinks") as LinkItem[];
  const themeOptions = t.raw("themeOptions") as { icon: string; label: string }[];

  const THEME_ICONS: Record<string, LucideIcon> = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  return (
    <footer className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 border border-border sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-6 border-b border-border p-8 sm:border-r lg:border-b-0">
              <p className="font-display text-2xl tracking-tight text-foreground">
                {t("brand")}
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
              <ul className="flex flex-wrap gap-3">
                {socials.map((social, index) => {
                  const Icon = SOCIAL_ICONS[social.icon] ?? Mail;
                  return (
                    <li key={index}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <Icon className="size-4" strokeWidth={1.75} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-b border-border p-8 sm:border-r lg:border-b-0">
              <h2 className="font-display text-sm tracking-tight text-foreground">
                {t("newsletter.title")}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("newsletter.description")}
              </p>
              <form className="mt-2 flex flex-col gap-3">
                <label className="sr-only" htmlFor={`${ns}-newsletter-email`}>
                  {t("newsletter.placeholder")}
                </label>
                <input
                  id={`${ns}-newsletter-email`}
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="w-full rounded-sm border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <button
                  type="submit"
                  className="w-full rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("newsletter.buttonLabel")}
                </button>
              </form>
            </div>

            {columns.map((column, index) => (
              <Reveal key={column.title} delay={index * 60}>
                <nav
                  aria-label={column.title}
                  className={`h-full border-b border-border p-8 lg:border-b-0 ${
                    index === 0 ? "sm:border-r" : ""
                  }`}
                >
                  <h2 className="font-display text-sm tracking-tight text-foreground">
                    {column.title}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-6 border-x border-b border-border p-8 sm:flex-row sm:items-center sm:justify-between">
            <fieldset className="flex items-center gap-1 rounded-sm border border-border p-1">
              <legend className="sr-only">{t("themeLegend")}</legend>
              {themeOptions.map((option, index) => {
                const Icon = THEME_ICONS[option.icon] ?? Monitor;
                const inputId = `${ns}-theme-${option.icon}`;
                return (
                  <span key={option.icon}>
                    <input
                      id={inputId}
                      type="radio"
                      name={`${ns}-theme`}
                      className="peer sr-only"
                      defaultChecked={index === 2}
                    />
                    <label
                      htmlFor={inputId}
                      className="flex size-8 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-primary peer-checked:bg-secondary peer-checked:text-secondary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
                    >
                      <Icon className="size-4" strokeWidth={1.75} />
                      <span className="sr-only">{option.label}</span>
                    </label>
                  </span>
                );
              })}
            </fieldset>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <p className="text-xs text-muted-foreground">{t("copyright")}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
