import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiLinkedinFill,
  RiTwitterXFill,
  RiInstagramLine,
  RiGlobalLine,
  RiMailLine,
  type RemixiconComponentType,
} from "@remixicon/react";

/**
 * Adaptado de la composición del arquetipo team-3 (grilla de tarjetas de
 * equipo con avatar, nombre y rol). Reescrito desde cero al contrato del
 * sitio: cada tarjeta revela bio y redes sociales bajo un velo que sube al
 * pasar el mouse (o al enfocar con teclado), manteniendo nombre y rol
 * siempre visibles.
 */

type SocialLink = { icon: string; href: string; label: string };
type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  socials: SocialLink[];
};

const SOCIAL_ICONS: Record<string, RemixiconComponentType> = {
  linkedin: RiLinkedinFill,
  twitter: RiTwitterXFill,
  instagram: RiInstagramLine,
  website: RiGlobalLine,
  email: RiMailLine,
};

export function TeamGridHoverReveal({ ns }: { ns: string }) {
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
                <article className="group relative overflow-hidden rounded-sm bg-card">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <SmartImage
                      src={member.image}
                      alt={member.imageAlt}
                      className="aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />

                    {/* Velo que sube desde abajo revelando bio + redes al
                        pasar el mouse o enfocar con teclado. */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-[calc(100%-4.5rem)] flex-col gap-3 bg-background/95 p-5 transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
                      <div>
                        <h3 className="font-display text-lg leading-tight tracking-tight text-foreground">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                        {member.bio}
                      </p>

                      <ul className="mt-1 flex gap-2 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                        {member.socials.map((social, socialIndex) => {
                          const Icon = SOCIAL_ICONS[social.icon] ?? RiGlobalLine;
                          return (
                            <li key={socialIndex}>
                              <a
                                href={social.href}
                                aria-label={social.label}
                                className="flex size-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                              >
                                <Icon className="size-4" />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
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
