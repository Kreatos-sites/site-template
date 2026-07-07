import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Globe,
  MessageCircle,
  Share2,
  Mail,
  Rss,
  type LucideIcon,
} from "lucide-react";

/**
 * Footer con marco (borde completo) y patrón diagonal decorativo en la barra
 * inferior. Organiza marca + descripción + redes sociales a la izquierda y
 * tres columnas de enlaces a la derecha; cierra con línea legal partida por
 * el rayado diagonal, evocando el arquetipo footer51 sin copiar su código.
 */

type SocialLink = { icon: string; href: string; label: string };
type LinkItem = { label: string; href: string };
type LinkColumn = { title: string; links: LinkItem[] };

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Globe,
  twitter: MessageCircle,
  facebook: Share2,
  instagram: Rss,
  email: Mail,
};

export function FooterDiagonalStripe({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const socials = t.raw("socials") as SocialLink[];
  const columns = t.raw("columns") as LinkColumn[];

  return (
    <footer className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="rounded-sm border border-border">
            <div className="grid grid-cols-1 gap-12 p-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16 lg:p-12">
              <div className="flex flex-col gap-6">
                <p className="font-display text-2xl tracking-tight text-foreground">
                  {t("brand")}
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {t("description")}
                </p>
                <ul className="flex flex-wrap gap-3">
                  {socials.map((social, index) => {
                    const Icon = SOCIAL_ICONS[social.icon] ?? Globe;
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

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                {columns.map((column, index) => (
                  <Reveal key={column.title} delay={index * 60}>
                    <nav aria-label={column.title}>
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
            </div>

            <div
              aria-hidden="true"
              className="h-3 w-full border-t border-border bg-[repeating-linear-gradient(45deg,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_10px)]"
            />

            <div className="flex flex-col gap-3 px-8 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-12">
              <p className="text-xs text-muted-foreground">{t("copyright")}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {(t.raw("legalLinks") as LinkItem[]).map((link) => (
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
