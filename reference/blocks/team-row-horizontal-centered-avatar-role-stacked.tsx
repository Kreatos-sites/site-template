import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Member = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

export function TeamRowHorizontalCenteredAvatarRoleStacked({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-16 flex flex-wrap items-start justify-center gap-x-10 gap-y-12 sm:gap-x-12">
          {members.map((member, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <div className="flex w-32 flex-col items-center gap-4 text-center sm:w-36">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-24 rounded-full sm:w-28"
                  />
                  <div>
                    <p className="font-display text-base text-foreground">{member.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
