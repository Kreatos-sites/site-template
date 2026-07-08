import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Siren, Phone, Clock } from "lucide-react";

export function ClinicUrgentCareBoldBanner({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const details = t.raw("details") as { icon: string; text: string }[];

  const icons: Record<string, typeof Clock> = {
    clock: Clock,
    phone: Phone,
  };

  return (
    <section className="border-t border-border bg-foreground py-(--section-gap)">
      <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary">
              <Siren
                className="size-8 text-primary-foreground"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
            <p className="mt-6 text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-balance text-background">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-background/70">
              {t("description")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <a
            href={t("phoneHref")}
            className="mt-10 inline-flex items-baseline gap-3 rounded-sm border border-background/15 bg-background/5 px-8 py-6 transition-colors hover:bg-background/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-semibold tracking-tight text-background">
              {t("phoneDisplay")}
            </span>
          </a>
        </Reveal>

        <ul className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-background/15 pt-8 sm:flex-row sm:gap-10">
          {details.map((item, i) => {
            const Icon = icons[item.icon] ?? Clock;
            return (
              <li key={i}>
                <Reveal delay={i * 60}>
                  <span className="flex items-center justify-center gap-2 text-sm font-medium text-background/80">
                    <Icon className="size-4 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    {item.text}
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
