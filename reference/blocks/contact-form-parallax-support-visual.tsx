import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  ClockIcon,
  ChatCircleTextIcon,
  ShieldCheckIcon,
  HeadsetIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type Field = { name: string; label: string; type: string; placeholder: string };
type Highlight = { icon: string; label: string; value: string };

const ICONS: Record<string, Icon> = {
  clock: ClockIcon,
  chat: ChatCircleTextIcon,
  shield: ShieldCheckIcon,
  headset: HeadsetIcon,
};

export function ContactFormParallaxSupportVisual({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const fields = t.raw("fields") as Field[];
  const highlights = t.raw("highlights") as Highlight[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-border lg:grid-cols-12">
          {/* Izquierda: formulario de contacto */}
          <div className="lg:col-span-7">
            <Reveal>
              <form className="flex h-full flex-col gap-6 bg-card p-8 lg:p-12">
                <div>
                  <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                    {t("eyebrow")}
                  </p>
                  <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                    {t("title")}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                    {t("subtitle")}
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.type === "textarea"
                          ? "flex flex-col gap-2 sm:col-span-2"
                          : "flex flex-col gap-2"
                      }
                    >
                      <label
                        htmlFor={field.name}
                        className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                      >
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          rows={5}
                          className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-fit items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("submitLabel")}
                </button>

                <p className="text-xs text-muted-foreground">{t("note")}</p>
              </form>
            </Reveal>
          </div>

          {/* Derecha: panel visual con capas superpuestas (efecto de profundidad sin JS de scroll) */}
          <div className="relative lg:col-span-5">
            <Reveal delay={80}>
              <div className="relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden">
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="absolute inset-0 aspect-auto h-full w-full scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent"
                />

                <div className="relative flex flex-col gap-6 p-8 lg:p-10">
                  <div>
                    <h3 className="font-display text-xl tracking-tight text-background">
                      {t("panelTitle")}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-background/80">
                      {t("panelSubtitle")}
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {highlights.map((highlight, index) => {
                      const HighlightIcon = ICONS[highlight.icon] ?? ShieldCheckIcon;
                      return (
                        <li key={highlight.label} className="contents">
                          <Reveal delay={140 + index * 60}>
                            <div className="flex items-center gap-3 rounded-sm border border-background/20 bg-background/10 p-4 backdrop-blur-sm">
                              <HighlightIcon
                                className="size-5 shrink-0 text-background"
                                weight="light"
                              />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-background">
                                  {highlight.value}
                                </span>
                                <span className="text-xs text-background/70">
                                  {highlight.label}
                                </span>
                              </div>
                            </div>
                          </Reveal>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
