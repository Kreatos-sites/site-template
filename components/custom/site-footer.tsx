import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { Link } from "@/i18n/navigation";
import config from "@/site.config";

type NavLink = { href: string; label: string };

/**
 * Sección CUSTOM — slot "footer". El section-renderer la envuelve en <footer>
 * e INYECTA el crédito de agencia; por eso aquí NO se emite ni <footer> ni el
 * crédito. Pie editorial y sobrio (despacho, no startup): marca corta grande en
 * font-display, tagline, y tres columnas asimétricas (explorar / contacto /
 * redes) con reglas finas. Acento primary parco: solo una hairline bajo la
 * marca y los estados hover. Datos del negocio 100% desde config; copy vía ns.
 */
export function SiteFooter({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const tCommon = useTranslations("common");
  const { business } = config;

  const links = t.raw("links") as NavLink[];
  const year = new Date().getFullYear();
  const tel = `tel:${business.phone.replace(/\s/g, "")}`;

  // Facebook/LinkedIn/Instagram son nombres propios de marca: se dejan como
  // texto. Solo se listan las redes que el negocio realmente publicó.
  const social = [
    { label: "Facebook", href: business.social?.facebook },
    { label: "LinkedIn", href: business.social?.linkedin },
    { label: "Instagram", href: business.social?.instagram },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <div className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-6 py-(--section-gap) lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marca — la razón social completa queda para la línea legal */}
          <Reveal className="lg:col-span-5">
            <p className="font-display text-2xl leading-none tracking-tight text-balance">
              {business.shortName ?? business.name}
            </p>
            <span className="mt-5 block h-px w-12 bg-primary" aria-hidden="true" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </Reveal>

          {/* Cluster asimétrico: deja la columna 6 como canaleta */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <Reveal delay={60}>
              <nav aria-label={t("navTitle")}>
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {t("navTitle")}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            <Reveal delay={90}>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t("contactTitle")}
              </p>
              <address className="mt-4 text-sm leading-relaxed text-muted-foreground not-italic">
                {business.address.street}
                <br />
                {tCommon("coloniaPrefix")} {business.address.colonia}
                <br />
                {business.address.zip} {business.address.city},{" "}
                {business.address.state}
              </address>
              <div className="mt-4 flex flex-col gap-1.5 text-sm">
                <a
                  href={tel}
                  className="w-fit text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {business.phone}
                </a>
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="w-fit text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {business.email}
                  </a>
                )}
              </div>
            </Reveal>

            {social.length > 0 && (
              <Reveal delay={120}>
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {t("followTitle")}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

        {/* Línea legal — el renderer inyecta el crédito de agencia aparte */}
        <Reveal delay={120} className="mt-16 border-t border-border pt-6">
          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {business.name}. {t("rights")}
            </p>
            <Link
              href="/aviso-de-privacidad"
              className="w-fit underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {t("privacyLink")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
