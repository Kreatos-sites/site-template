import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Member = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

type Group = {
  area: string;
  members: Member[];
};

export function TeamGradientOrgchartHierarchy({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const lead = t.raw("lead") as Member;
  const groups = t.raw("groups") as Group[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-(--section-gap)">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col items-center">
          <Reveal>
            <div className="flex w-64 flex-col items-center rounded-md border border-border bg-card px-6 py-8 text-center shadow-sm">
              <SmartImage
                src={lead.image}
                alt={lead.imageAlt}
                className="aspect-square w-24 rounded-full ring-2 ring-primary/30"
              />
              <p className="mt-5 font-display text-lg text-foreground">
                {lead.name}
              </p>
              <p className="mt-1 text-xs tracking-[0.15em] text-primary uppercase">
                {lead.role}
              </p>
            </div>
          </Reveal>

          <div aria-hidden className="h-10 w-px bg-border" />

          <div
            aria-hidden
            className="hidden h-px w-full max-w-4xl bg-border sm:block"
          />

          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:mt-0 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, gi) => (
              <div key={group.area} className="flex flex-col items-center">
                <div
                  aria-hidden
                  className="h-10 w-px bg-border sm:h-6"
                />
                <Reveal delay={gi * 60}>
                  <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    {group.area}
                  </p>
                </Reveal>

                <ul className="mt-6 flex w-full flex-col items-center gap-4">
                  {group.members.map((member, mi) => (
                    <li key={member.name} className="w-full max-w-xs">
                      <Reveal delay={gi * 60 + mi * 60 + 60}>
                        <div className="flex items-center gap-4 rounded-sm border border-border bg-card px-4 py-3">
                          <SmartImage
                            src={member.image}
                            alt={member.imageAlt}
                            className="aspect-square w-12 shrink-0 rounded-full"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-display text-sm text-foreground">
                              {member.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
