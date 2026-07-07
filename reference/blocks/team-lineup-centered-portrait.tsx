import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { LinkIcon } from "@phosphor-icons/react/dist/ssr";

type Member = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  linkedin?: string;
};

export function TeamLineupCenteredPortrait({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium tracking-[0.2em] text-primary uppercase">
              {t("badge")}
            </span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 flex flex-wrap items-start justify-center gap-x-4 gap-y-12 sm:gap-x-8">
          {members.map((member, i) => (
            <li
              key={member.name}
              className="w-[calc(50%-1rem)] shrink-0 sm:w-[calc(33.333%-1.5rem)] lg:w-[calc(20%-1.6rem)]"
            >
              <Reveal delay={i * 60}>
                <div className="flex flex-col items-center text-center">
                  <SmartImage
                    src={member.image}
                    alt={member.imageAlt}
                    className="aspect-square w-full max-w-36 rounded-full ring-1 ring-border"
                  />
                  <span className="mt-5 font-display text-lg text-foreground">
                    {member.name}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </span>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      aria-label={t("linkedinLabel", { name: member.name })}
                      className="mt-3 inline-flex items-center justify-center rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      <LinkIcon className="size-4" />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
