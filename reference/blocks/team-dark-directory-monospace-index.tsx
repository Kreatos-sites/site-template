import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";

type Member = {
  index: string;
  name: string;
  role: string;
  department: string;
  image: string;
  imageAlt: string;
};

export function TeamDarkDirectoryMonospaceIndex({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const members = t.raw("members") as Member[];

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-background/15">
          <div className="hidden grid-cols-[3.5rem_3.5rem_1fr_1fr_1fr] gap-4 border-b border-background/15 px-2 py-3 sm:grid">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-background/50 uppercase">
              #
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-background/50 uppercase" />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-background/50 uppercase">
              {t("headingName")}
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-background/50 uppercase">
              {t("headingRole")}
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-background/50 uppercase">
              {t("headingDepartment")}
            </span>
          </div>

          <ul>
            {members.map((member, i) => (
              <li key={member.index} className="border-b border-background/15">
                <Reveal delay={i * 60}>
                  <div className="grid grid-cols-[2.5rem_2.75rem_1fr] items-center gap-4 px-2 py-4 sm:grid-cols-[3.5rem_3.5rem_1fr_1fr_1fr] sm:gap-4">
                    <span className="font-mono text-sm text-background/40 tabular-nums">
                      {member.index}
                    </span>
                    <SmartImage
                      src={member.image}
                      alt={member.imageAlt}
                      className="aspect-square rounded-sm grayscale"
                    />
                    <div className="min-w-0 sm:contents">
                      <p className="truncate font-display text-base text-background sm:col-auto">
                        {member.name}
                      </p>
                      <p className="mt-1 truncate font-mono text-xs text-background/60 sm:col-auto sm:mt-0">
                        {member.role}
                      </p>
                      <p className="hidden truncate font-mono text-xs text-background/60 sm:col-auto sm:block">
                        {member.department}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
