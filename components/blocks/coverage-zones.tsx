import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { MapPin } from "lucide-react";

export function CoverageZones({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Zone = { name: string; detail: string };
  const zones = t.raw("zones") as Zone[];
  const intro = t.raw("intro") as string | undefined;

  return (
    <section className="border-t border-border bg-secondary py-(--section-gap) text-secondary-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
                {t("title")}
              </h2>
              {intro ? (
                <p className="mt-6 max-w-md text-base leading-relaxed text-secondary-foreground/70">
                  {intro}
                </p>
              ) : null}
              <div
                className="mt-10 flex items-center gap-3 text-sm text-secondary-foreground/60"
                aria-hidden="true"
              >
                <span className="h-px w-10 bg-border" />
                <MapPin className="size-4 text-primary" />
                <span className="tabular-nums">{zones.length}</span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {zones.map((zone, index) => (
                <li key={zone.name} className="bg-card">
                  <Reveal
                    delay={index * 60}
                    className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-secondary"
                  >
                    <span
                      className="flex size-11 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10"
                      aria-hidden="true"
                    >
                      <MapPin className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="mt-auto space-y-2">
                      <h3 className="font-display text-lg tracking-tight text-foreground">
                        {zone.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {zone.detail}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
