import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

type Partner = { name: string; role: string };

export function AboutPartnersSplitNarrativeLogoMarksBlurReveal({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];
  const partners = t.raw("partners") as Partner[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div className="mt-6 space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
            {partners.map((partner, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="flex h-full flex-col justify-center gap-2 bg-card p-6 opacity-0"
                  style={{
                    animation: `partner-sharpen 700ms ease-out ${i * 80}ms forwards`,
                  }}
                >
                  <span className="font-display text-lg tracking-tight text-foreground">
                    {partner.name}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">
                    {partner.role}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes partner-sharpen {
          from { opacity: 0; filter: blur(6px); }
          to { opacity: 1; filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
