import { useTranslations } from "next-intl";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Leader = {
  name: string;
  role: string;
  quote: string;
  image: string;
  imageAlt: string;
};

type Member = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

export function TeamBentoAsymmetricLeaderSpotlight({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const leader = t.raw("leader") as Leader;
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Tile grande vertical: líder/fundador con foto a sangre y cita */}
          <Reveal>
            <article className="group relative flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-lg border border-border lg:col-span-2 lg:row-span-2">
              <SmartImage
                src={leader.image}
                alt={leader.imageAlt}
                className="absolute inset-0 aspect-auto"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent"
              />
              <div className="relative flex flex-col gap-4 p-7">
                <QuotesIcon
                  className="size-7 text-background/70"
                  weight="fill"
                />
                <p className="font-display text-lg leading-snug text-background text-balance">
                  {leader.quote}
                </p>
                <div className="mt-2 border-t border-background/25 pt-4">
                  <p className="font-display text-xl text-background">
                    {leader.name}
                  </p>
                  <p className="mt-1 text-sm text-background/80">
                    {leader.role}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Mosaico irregular: tiles pequeños de retrato + nombre + rol */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            {members.map((member, i) => (
              <Reveal key={i} delay={(i + 1) * 60}>
                <article
                  className={`flex h-full flex-col items-start gap-3 rounded-lg border border-border bg-card p-5 ${
                    i % 5 === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-11 rounded-full"
                    sizes="44px"
                  />
                  <div>
                    <h3 className="font-display text-base leading-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
