import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  Briefcase,
  Bird,
  Camera,
  Globe,
  Mail,
  type LucideIcon,
} from "lucide-react";

/**
 * Adaptado de la composición del arquetipo team-1 (grilla básica de
 * tarjetas de equipo con avatar, nombre, rol y redes). Reescrito desde
 * cero al contrato del sitio: tarjetas simples y siempre visibles (sin
 * velo ni hover-reveal), pensadas como el bloque de equipo por defecto.
 */

type SocialLink = { icon: string; href: string; label: string };
type Member = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  socials: SocialLink[];
};

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Briefcase,
  twitter: Bird,
  instagram: Camera,
  website: Globe,
  email: Mail,
};

export function TeamMembersGridBasic({ ns }: { ns: string }) {
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
                <article className="flex flex-col items-center gap-4 rounded-sm bg-card p-8 text-center">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-28 rounded-full"
                    sizes="112px"
                  />

                  <div>
                    <h3 className="font-display text-lg leading-tight tracking-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>

                  <ul className="mt-1 flex gap-2">
                    {member.socials.map((social, socialIndex) => {
                      const Icon = SOCIAL_ICONS[social.icon] ?? Globe;
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
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
