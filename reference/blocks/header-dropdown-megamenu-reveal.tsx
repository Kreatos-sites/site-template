import { useTranslations } from "next-intl";
import {
  BookOpenTextIcon,
  ChatCircleTextIcon,
  FileTextIcon,
  PlayCircleIcon,
  ScalesIcon,
  ArrowUpRightIcon,
  CaretDownIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: header-dropdown-megamenu-reveal — navegación superior con un
 * megamenú compacto de "Recursos" que se revela suavemente (transición CSS
 * de opacidad/traslado sobre <details>/<summary> nativo, sin JS de cliente
 * ni framer-motion). Incluye tarjeta destacada dentro del panel y drawer
 * móvil con el mismo contenido aplanado.
 *
 * ns esperado:
 *   { logo: string, navLabel: string, nav: [{ label: string, href: string }],
 *     resourcesLabel: string,
 *     resourceLinks: [{ icon: string, label: string, description: string, href: string }],
 *     resourceHighlight: { label: string, description: string, href: string, cta: string },
 *     ctaLabel: string, ctaHref: string, menuLabel: string }
 */
type NavItem = { label: string; href: string };
type ResourceLink = { icon: string; label: string; description: string; href: string };
type ResourceHighlight = { label: string; description: string; href: string; cta: string };

const ICONS: Record<string, typeof FileTextIcon> = {
  guides: BookOpenTextIcon,
  cases: ScalesIcon,
  blog: FileTextIcon,
  webinars: PlayCircleIcon,
  faq: ChatCircleTextIcon,
};

export function HeaderDropdownMegamenuReveal({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const nav = t.raw("nav") as NavItem[];
  const resourceLinks = t.raw("resourceLinks") as ResourceLink[];
  const highlight = t.raw("resourceHighlight") as ResourceHighlight;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
        <a
          href="#inicio"
          className="font-display text-lg tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t("logo")}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={t("navLabel")}>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
              {t("resourcesLabel")}
              <CaretDownIcon className="size-3.5 transition-transform duration-200 group-open:rotate-180" weight="bold" />
            </summary>

            <div className="absolute top-full left-1/2 z-40 w-[36rem] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 ease-out starting:open:opacity-0 group-open:translate-y-0 group-open:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-card p-3 shadow-lg">
                {resourceLinks.map((link, i) => {
                  const Icon = ICONS[link.icon] ?? FileTextIcon;
                  return (
                    <a
                      key={i}
                      href={link.href}
                      className="flex gap-3 rounded-md p-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Icon className="mt-0.5 size-5 shrink-0 text-primary" weight="regular" />
                      <span>
                        <span className="block text-sm font-medium text-foreground">{link.label}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {link.description}
                        </span>
                      </span>
                    </a>
                  );
                })}
                <a
                  href={highlight.href}
                  className="col-span-2 mt-1 flex items-center justify-between gap-4 rounded-md bg-secondary p-4 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>
                    <span className="block text-sm font-medium text-foreground">{highlight.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {highlight.description}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
                    {highlight.cta}
                    <ArrowUpRightIcon className="size-3.5" weight="bold" />
                  </span>
                </a>
              </div>
            </div>
          </details>

          {nav.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={t("ctaHref")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
            <ArrowUpRightIcon className="size-4" weight="bold" />
          </a>
        </div>

        <details className="group relative lg:hidden">
          <summary
            aria-label={t("menuLabel")}
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
          >
            <ListIcon className="size-5 group-open:hidden" weight="bold" />
            <XIcon className="hidden size-5 group-open:block" weight="bold" />
          </summary>

          <div className="fixed inset-x-0 top-[calc(4rem+1px)] z-40 flex max-h-[calc(100vh-4rem-1px)] flex-col gap-1 overflow-y-auto border-t border-border bg-background px-6 py-8 shadow-lg">
            <nav className="flex flex-col gap-1" aria-label={t("navLabel")}>
              <span className="pt-2 pb-1 text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("resourcesLabel")}
              </span>
              {resourceLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="border-b border-border py-4 text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </a>
              ))}
              {nav.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="border-b border-border py-4 text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={t("ctaHref")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("ctaLabel")}
              <ArrowUpRightIcon className="size-4" weight="bold" />
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
