import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

const NOISE_TEXTURE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

export function HeaderFullbleedWarmPaperTextureEditorial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const links = t.raw("links") as NavLink[];

  return (
    <header className="relative border-b border-border bg-secondary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: `url("${NOISE_TEXTURE}")`, backgroundSize: "160px 160px" }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-12 lg:px-8 lg:py-16">
        <div className="flex w-full items-center justify-between lg:justify-center">
          <a
            href="#inicio"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("wordmark")}
          </a>

          <details className="group relative lg:hidden">
            <summary
              aria-label={t("menuLabel")}
              className="flex size-10 cursor-pointer list-none items-center justify-center border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5 group-open:hidden" strokeWidth={1.5} />
              <X className="hidden size-5 group-open:block" strokeWidth={1.5} />
            </summary>

            <div className="fixed inset-x-0 top-[calc(6.5rem+1px)] z-50 border-b border-border bg-secondary px-6 py-8">
              <nav aria-label={t("navLabel")} className="flex flex-col items-center gap-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-display text-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={t("ctaHref")}
                  className="mt-2 text-sm font-medium tracking-tight text-primary underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t("ctaLabel")}
                </a>
              </nav>
            </div>
          </details>
        </div>

        <nav
          aria-label={t("navLabel")}
          className="hidden flex-wrap items-center justify-center gap-x-1 text-sm tracking-wide text-muted-foreground lg:flex"
        >
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="mx-3 text-primary">
                  &middot;
                </span>
              )}
              <a
                href={link.href}
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </a>
            </span>
          ))}
          <span aria-hidden="true" className="mx-3 text-primary">
            &middot;
          </span>
          <a
            href={t("ctaHref")}
            className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ctaLabel")}
          </a>
        </nav>
      </div>
    </header>
  );
}
