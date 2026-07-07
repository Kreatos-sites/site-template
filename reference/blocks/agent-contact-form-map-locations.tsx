import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiMapPin2Line,
  RiPhoneLine,
  RiTimeLine,
  RiBuilding2Line,
  RiHome4Line,
  RiStore2Line,
  type RemixiconComponentType,
} from "@remixicon/react";

type Location = {
  icon: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
};

type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, RemixiconComponentType> = {
  "map-pin": RiMapPin2Line,
  building: RiBuilding2Line,
  home: RiHome4Line,
  store: RiStore2Line,
};

// Posiciones fijas del pin sobre el lienzo del mapa (presentacional, no data-driven).
const PIN_POSITIONS = [
  "left-[18%] top-[42%]",
  "left-[46%] top-[24%]",
  "left-[72%] top-[52%]",
  "left-[60%] top-[74%]",
];

export function AgentContactFormMapLocations({ ns }: { ns: string }) {
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

        <Reveal delay={60}>
          <div className="relative mt-12 overflow-hidden rounded-sm border border-border">
            <SmartImage
              src={t("mapImage")}
              alt={t("mapImageAlt")}
              className="aspect-[16/6]"
            />
            {locations.map((location, index) => (
              <span
                key={location.name}
                aria-hidden="true"
                className={`absolute ${PIN_POSITIONS[index % PIN_POSITIONS.length]} grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background`}
              >
                <RiMapPin2Line className="size-4" />
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Izquierda: tarjetas de sedes */}
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {locations.map((location, index) => {
                const Icon = ICONS[location.icon] ?? RiMapPin2Line;
                return (
                  <li key={location.name} className="contents">
                    <Reveal delay={index * 60}>
                      <article className="flex h-full flex-col gap-4 rounded-sm border border-border bg-card p-6">
                        <span
                          aria-hidden="true"
                          className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
                        >
                          <Icon className="size-5" />
                        </span>
                        <div className="flex flex-col gap-2">
                          <h3 className="font-display text-lg tracking-tight text-foreground">
                            {location.name}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {location.address}
                          </p>
                        </div>
                        <div className="mt-auto flex flex-col gap-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <RiPhoneLine
                              aria-hidden="true"
                              className="size-3.5 shrink-0 text-primary"
                            />
                            {location.phone}
                          </span>
                          <span className="flex items-center gap-2">
                            <RiTimeLine
                              aria-hidden="true"
                              className="size-3.5 shrink-0 text-primary"
                            />
                            {location.hours}
                          </span>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Derecha: formulario de contacto */}
          <div className="lg:col-span-5">
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
