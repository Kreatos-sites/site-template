import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  MapPin,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";

type Location = {
  icon: string;
  name: string;
  address: string;
  phone: string;
};

type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
};

// Posiciones fijas del pin sobre el lienzo del mapa (presentacional, no data-driven).
const PIN_POSITIONS = [
  "left-[22%] top-[36%]",
  "left-[58%] top-[58%]",
  "left-[74%] top-[26%]",
];

export function ContactMapAndLocationsFormSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const locations = t.raw("locations") as Location[];
  const fields = t.raw("fields") as Field[];

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
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Izquierda: mapa + lista compacta de sedes */}
          <div className="lg:col-span-6">
            <Reveal delay={60}>
              <div className="relative overflow-hidden rounded-sm border border-border">
                <SmartImage
                  src={t("mapImage")}
                  alt={t("mapImageAlt")}
                  className="aspect-[4/5]"
                />
                {locations.map((location, index) => (
                  <span
                    key={location.name}
                    aria-hidden="true"
                    className={`absolute ${PIN_POSITIONS[index % PIN_POSITIONS.length]} grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background`}
                  >
                    <MapPin className="size-4" strokeWidth={2} />
                  </span>
                ))}
              </div>
            </Reveal>

            <ul className="mt-6 flex flex-col divide-y divide-border border-t border-border">
              {locations.map((location, index) => {
                const Icon = ICONS[location.icon] ?? MapPin;
                return (
                  <li key={location.name} className="contents">
                    <Reveal delay={index * 60}>
                      <article className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
                          >
                            <Icon className="size-4" strokeWidth={1.75} />
                          </span>
                          <div>
                            <h3 className="font-display text-base tracking-tight text-foreground">
                              {location.name}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {location.address}
                            </p>
                          </div>
                        </div>
                        <span className="flex items-center gap-2 pl-11 text-sm text-muted-foreground sm:pl-0">
                          <Phone
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-primary"
                            strokeWidth={1.75}
                          />
                          {location.phone}
                        </span>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Derecha: formulario de contacto */}
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <form className="flex flex-col gap-5 rounded-sm border border-border bg-card p-8">
                <h3 className="font-display text-lg tracking-tight text-foreground">
                  {t("formTitle")}
                </h3>
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
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
                        rows={4}
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
