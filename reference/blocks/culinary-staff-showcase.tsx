import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Camera, Briefcase, Mail, type LucideIcon } from "lucide-react";

type SocialLink = {
  type: string;
  href: string;
  label: string;
};

type StaffMember = {
  name: string;
  role: string;
  specialty: string;
  image: string;
  imageAlt: string;
  socials: SocialLink[];
};

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Camera,
  linkedin: Briefcase,
  email: Mail,
};

export function CulinaryStaffShowcase({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const staff = t.raw("staff") as StaffMember[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((member, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="flex h-full flex-col">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-[4/5] rounded-sm"
                  />
                  <div className="mt-5 flex flex-col gap-1">
                    <h3 className="font-display text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {member.role}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {member.specialty}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    {member.socials.map((social, j) => {
                      const Icon = SOCIAL_ICONS[social.type] ?? Mail;
                      return (
                        <a
                          key={j}
                          href={social.href}
                          aria-label={social.label}
                          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Icon className="size-4" strokeWidth={1.75} />
                        </a>
                      );
                    })}
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
