import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Mail,
  Phone,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

/**
 * BLOQUE: property-agent-spotlight-split-portrait — Split asimétrico de
 * asesor inmobiliario. Mitad izquierda: retrato a sangre completa (sin
 * recortes por padding), altura completa de la sección. Mitad derecha:
 * fondo claro sólido con bio, credenciales, cifras de propiedades cerradas
 * y tarjeta de contacto. Tono cálido y humano; para presentar al broker
 * responsable de una cartera o desarrollo.
 *
 * ns: {
 *   eyebrow, image, imageAlt, name, role,
 *   bio: string[],
 *   credentials: string[],
 *   stats: [{ icon, value, label }],
 *   contact: { phoneLabel, phone, emailLabel, email, ctaLabel, ctaHref }
 * }
 */
type Stat = {
  icon: string;
  value: string;
  label: string;
};

const STAT_ICONS: Record<string, typeof Building2> = {
  properties: Building2,
  clients: Users,
  credential: BadgeCheck,
};

export function PropertyAgentSpotlightSplitPortrait({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const bio = t.raw("bio") as string[];
  const credentials = t.raw("credentials") as string[];
  const stats = t.raw("stats") as Stat[];
  const contact = t.raw("contact") as {
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    ctaLabel: string;
    ctaHref: string;
  };

  return (
    <section className="border-t border-border bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[44rem]">
            <SmartImage
              src={t("image")}
              alt={t("imageAlt")}
              className="h-full w-full rounded-none"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center bg-secondary/40 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal delay={60}>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("name")}
            </h2>
            <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground">
              {t("role")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 flex flex-col gap-4">
              {bio.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-6 flex flex-col gap-2.5">
              {credentials.map((credential, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <BadgeCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    strokeWidth={1.75}
                  />
                  <span className="text-sm leading-relaxed text-foreground">
                    {credential}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {stats.map((stat, i) => {
                const Icon = STAT_ICONS[stat.icon] ?? Building2;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <Icon aria-hidden="true" className="size-5 text-primary" strokeWidth={1.75} />
                    <dd className="font-display text-2xl tracking-tight text-foreground">
                      {stat.value}
                    </dd>
                    <dt className="text-xs leading-snug text-muted-foreground">{stat.label}</dt>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-5 rounded-sm border border-border bg-card p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={`tel:${contact.phone}`}
                  className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Phone aria-hidden="true" className="size-4 text-primary" strokeWidth={1.75} />
                  <span className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{contact.phoneLabel}</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {contact.phone}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Mail aria-hidden="true" className="size-4 text-primary" strokeWidth={1.75} />
                  <span className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{contact.emailLabel}</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {contact.email}
                    </span>
                  </span>
                </a>
              </div>

              <a
                href={contact.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {contact.ctaLabel}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
