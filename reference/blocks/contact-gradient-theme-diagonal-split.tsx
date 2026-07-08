import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  type LucideIcon,
} from "lucide-react";

type Channel = { icon: string; label: string; value: string };
type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, LucideIcon> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  whatsapp: MessageCircle,
  hours: Clock,
};

export function ContactGradientThemeDiagonalSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const channels = t.raw("channels") as Channel[];
  const fields = t.raw("fields") as Field[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm border border-border">
          {/* Panel de color: gradiente primary + patrón de líneas + copy + canales */}
          <div
            className="relative bg-gradient-to-br from-primary via-primary to-primary/80 px-8 py-14 sm:px-12 sm:py-16 lg:absolute lg:inset-y-0 lg:left-0 lg:z-10 lg:w-[60%] lg:px-16 lg:py-20 lg:[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 text-primary-foreground opacity-15 [background-image:repeating-linear-gradient(115deg,currentColor_0px,currentColor_1px,transparent_1px,transparent_14px)]"
            />

            <div className="relative">
              <Reveal>
                <p className="text-xs font-medium tracking-[0.25em] text-primary-foreground/70 uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-5 max-w-md font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
                  {t("title")}
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-primary-foreground/80 text-pretty">
                  {t("subtitle")}
                </p>
              </Reveal>

              <ul className="mt-10 flex flex-col gap-5">
                {channels.map((channel, index) => {
                  const ChannelIcon = ICONS[channel.icon] ?? Phone;
                  return (
                    <li key={channel.label}>
                      <Reveal delay={index * 60}>
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground"
                          >
                            <ChannelIcon className="size-4" strokeWidth={1.75} />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">
                              {channel.label}
                            </span>
                            <span className="text-sm text-primary-foreground">
                              {channel.value}
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

          {/* Panel del formulario */}
          <div className="relative bg-card px-8 py-14 sm:px-12 sm:py-16 lg:ml-[42%] lg:px-16 lg:py-20 lg:pl-24">
            <Reveal delay={80}>
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {fields.map((field, index) => (
                    <Reveal key={field.name} delay={index * 60}>
                      <div
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
                    </Reveal>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("submitLabel")}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
