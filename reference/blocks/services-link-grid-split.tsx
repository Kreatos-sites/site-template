import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Compass,
  Gauge,
  Layers,
  LineChart,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  clipboard: ClipboardCheck,
  compass: Compass,
  gauge: Gauge,
  layers: Layers,
  chart: LineChart,
  shield: ShieldCheck,
  truck: Truck,
  wrench: Wrench,
};

export function ServicesLinkGridSplit({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as ServiceItem[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-border pb-12 lg:grid-cols-12 lg:gap-8">
          <Reveal>
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="divide-y divide-border">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Compass;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="group grid grid-cols-1 items-start gap-6 py-10 sm:grid-cols-12 sm:gap-8">
                    <div className="flex items-center gap-4 sm:col-span-4">
                      <span
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-start justify-between gap-6 sm:col-span-8">
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <ArrowUpRight
                        className="mt-1 size-5 shrink-0 text-muted-foreground/60 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                        strokeWidth={1.75}
                      />
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
