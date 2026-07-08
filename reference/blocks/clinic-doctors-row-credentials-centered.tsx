import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { BadgeCheck } from "lucide-react";

type Doctor = {
  name: string;
  specialty: string;
  credential: string;
  image: string;
  imageAlt: string;
};

export function ClinicDoctorsRowCredentialsCentered({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const doctors = t.raw("doctors") as Doctor[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <ul className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:justify-center lg:gap-x-12">
          {doctors.map((doctor, i) => (
            <li key={i} className="lg:w-44 lg:shrink-0">
              <Reveal delay={i * 60}>
                <div className="flex flex-col items-center text-center">
                  <SmartImage
                    src={doctor.image}
                    alt={doctor.imageAlt}
                    className="aspect-square w-28 rounded-full ring-1 ring-border"
                  />
                  <h3 className="mt-5 font-display text-lg text-foreground">
                    {doctor.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{doctor.specialty}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <BadgeCheck
                      className="size-3.5 shrink-0 text-primary"
                      strokeWidth={1.75}
                    />
                    {doctor.credential}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
