import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  Activity,
  Baby,
  Bone,
  Brain,
  Eye,
  HeartPulse,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";

type Specialty = {
  icon: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
};

const ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  baby: Baby,
  bone: Bone,
  brain: Brain,
  eye: Eye,
  heart: HeartPulse,
  stethoscope: Stethoscope,
  syringe: Syringe,
};

export function SpecialtiesGrid({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const specialties = t.raw("specialties") as Specialty[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty, index) => {
            const Icon = ICONS[specialty.icon] ?? Stethoscope;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
                    <div className="relative">
                      <SmartImage
                        src={specialty.image}
                        alt={specialty.imageAlt}
                        className="aspect-[4/3] w-full"
                      />
                      <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-background px-3 py-1 text-[0.6875rem] font-medium tracking-[0.1em] text-primary uppercase ring-1 ring-inset ring-border">
                        {specialty.tag}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-8">
                      <span
                        className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>

                      <div>
                        <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                          {specialty.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {specialty.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
