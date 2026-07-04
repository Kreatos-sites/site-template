import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SmartImage } from "@/components/shared/smart-image";
import type { SectionOf } from "@/lib/config";

type Milestone = { year: string; text: string };

export function About({ variant = "portrait", image, ns }: SectionOf<"about">) {
  const t = useTranslations(ns ?? "about");
  const paragraphs = t.raw("paragraphs") as string[];
  const credentials = t.raw("credentials") as string[];

  if (variant === "timeline") {
    const milestones = t.raw("milestones") as Milestone[];

    return (
      <section id="nosotros" className="border-t border-border py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          </Reveal>
          <ol className="mt-14 max-w-2xl space-y-0">
            {milestones.map((m, index) => (
              <li key={m.year} className="relative border-l border-border pb-10 pl-8 last:pb-0">
                <Reveal delay={index * 80}>
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[5px] size-2.5 rounded-full bg-primary"
                  />
                  <p className="font-display text-2xl text-primary tabular-nums">{m.year}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {m.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (variant === "plain") {
    return (
      <section id="nosotros" className="border-t border-border py-(--section-gap)">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-muted-foreground">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <p className="mt-10 font-display text-lg">{t("signatureName")}</p>
            <p className="text-sm text-muted-foreground">{t("signatureRole")}</p>
          </Reveal>
        </div>
      </section>
    );
  }

  // portrait (default): retrato a la izquierda con marco desplazado,
  // texto y credenciales a la derecha.
  return (
    <section id="nosotros" className="border-t border-border py-(--section-gap)">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {image && (
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -left-4 hidden h-full w-full border border-primary/40 lg:block"
                />
                <SmartImage
                  src={image}
                  alt={t("imageAlt")}
                  className="relative aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        )}
        <div className="lg:col-span-7 lg:pl-4">
          <Reveal delay={100}>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-muted-foreground">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <ul className="mt-9 space-y-3 border-l-2 border-primary pl-5">
              {credentials.map((c) => (
                <li key={c} className="text-sm text-foreground">
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <p className="font-display text-lg">{t("signatureName")}</p>
              <p className="text-sm text-muted-foreground">{t("signatureRole")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
