import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  LinkedinLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  GlobeIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

/**
 * Adaptado de la composición del arquetipo team-3 (grilla responsiva de
 * tarjetas de equipo que revelan bio y redes sociales al pasar el cursor).
 * Reescrito desde cero al contrato del sitio: retrato siempre visible con
 * nombre y puesto fijos bajo la imagen; al pasar el mouse o enfocar con
 * teclado aparece un panel de detalle con capa oscura, bio, especialidades
 * y redes sociales.
 */

type SocialLink = { icon: string; href: string; label: string };
type Member = {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image: string;
  imageAlt: string;
  socials: SocialLink[];
};

const SOCIAL_ICONS: Record<string, Icon> = {
  linkedin: LinkedinLogoIcon,
  twitter: TwitterLogoIcon,
  instagram: InstagramLogoIcon,
  website: GlobeIcon,
  email: EnvelopeSimpleIcon,
};

export function TeamPortraitsGridHoverDetails({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section
      data-demo="equipo"
      className="border-t border-border bg-background py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <li key={member.name} className="contents">
              <Reveal delay={index * 60}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                    <SmartImage
                      src={member.image}
                      alt={member.imageAlt}
                      className="aspect-[4/5] w-full"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />

                    {/* Panel de detalle: capa oscura con fade-in que cubre
                        el retrato al pasar el mouse o enfocar con teclado. */}
                    <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-foreground/90 p-5 opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
                      <p className="text-sm leading-relaxed text-background/90">
                        {member.bio}
                      </p>

                      <ul className="flex flex-wrap gap-1.5">
                        {member.expertise.map((skill, skillIndex) => (
                          <li
                            key={skillIndex}
                            className="rounded-sm border border-background/30 px-2 py-0.5 text-xs text-background/80"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-1 flex gap-2">
                        {member.socials.map((social, socialIndex) => {
                          const Icon = SOCIAL_ICONS[social.icon] ?? GlobeIcon;
                          return (
                            <li key={socialIndex}>
                              <a
                                href={social.href}
                                aria-label={social.label}
                                className="flex size-8 items-center justify-center rounded-sm border border-background/30 text-background/90 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                              >
                                <Icon className="size-4" />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-display text-lg leading-tight tracking-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
