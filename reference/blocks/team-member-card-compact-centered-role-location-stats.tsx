import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { MapPinIcon, BriefcaseIcon } from "@phosphor-icons/react/dist/ssr";

type Stat = { label: string; value: string };

export function TeamMemberCardCompactCenteredRoleLocationStats({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];

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
        </Reveal>

        <Reveal delay={80}>
          <article className="mx-auto mt-16 flex max-w-sm flex-col items-center gap-5 rounded-lg border border-border bg-card p-10 text-center">
            <SmartImage
              src={t("image")}
              alt={t("imageAlt")}
              className="aspect-square w-24 rounded-full"
            />
            <div>
              <h3 className="font-display text-xl text-foreground">
                {t("name")}
              </h3>
              <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-primary">
                <BriefcaseIcon className="size-4" aria-hidden="true" />
                {t("role")}
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <MapPinIcon className="size-4" aria-hidden="true" />
                {t("location")}
              </p>
            </div>

            <div className="mt-2 grid w-full grid-cols-3 gap-2 border-t border-border pt-5">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-display text-lg text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
