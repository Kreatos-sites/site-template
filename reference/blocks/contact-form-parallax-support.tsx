import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  ClockIcon,
  HeadsetIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Highlight = { icon: string; label: string };
type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, PhosphorIcon> = {
  clock: ClockIcon,
  headset: HeadsetIcon,
  shield: ShieldCheckIcon,
};

export function ContactFormParallaxSupport({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const highlights = t.raw("highlights") as Highlight[];
  const fields = t.raw("fields") as Field[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Left: sticky visual panel */}
          <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative mt-10 overflow-hidden rounded-sm">
                <SmartImage
                  src={t("image")}
                  alt={t("imageAlt")}
                  className="aspect-[4/5] rounded-sm"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-6">
                  <ul className="flex flex-col gap-4">
                    {highlights.map((highlight, index) => {
                      const Icon = ICONS[highlight.icon] ?? HeadsetIcon;
                      return (
                        <li key={index} className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-card">
                            <Icon
                              className="size-4 text-primary"
                              weight="regular"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {highlight.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Reveal delay={160}>
              <form className="flex flex-col gap-6 rounded-sm border border-border bg-card p-8 sm:p-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                >
                  {t("submitLabel")}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  {t("responseNote")}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
