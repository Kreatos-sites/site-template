import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  Stethoscope,
  HeartPulse,
  Syringe,
  Microscope,
  Activity,
  Baby,
  Bone,
  Eye,
  Brain,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tall?: boolean;
};

const ICONS: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  heart: HeartPulse,
  syringe: Syringe,
  microscope: Microscope,
  activity: Activity,
  baby: Baby,
  bone: Bone,
  eye: Eye,
  brain: Brain,
};

export function ServicesMasonry({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const services = t.raw("services") as Service[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-flow:dense]">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Stethoscope;
            return (
              <Reveal
                key={service.title}
                delay={index * 60}
                className={cn(
                  "group",
                  service.tall && "lg:row-span-2",
                )}
              >
                <article
                  className={cn(
                    "flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/40",
                    service.tall ? "min-h-[26rem]" : "min-h-[16rem]",
                  )}
                >
                  {service.image ? (
                    <SmartImage
                      src={service.image}
                      alt={service.imageAlt ?? ""}
                      className={cn(
                        "w-full",
                        service.tall ? "aspect-[4/5]" : "aspect-[16/9]",
                      )}
                    />
                  ) : null}

                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <Icon
                      className="size-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none block h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
