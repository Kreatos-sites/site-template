import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Banknote,
  Calculator,
  ClipboardList,
  FileSignature,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  deliverables: string[];
};

const ICONS: Record<string, LucideIcon> = {
  scale: Scale,
  calculator: Calculator,
  clipboard: ClipboardList,
  shield: ShieldCheck,
  signature: FileSignature,
  banknote: Banknote,
};

export function ServiceCatalogPriced({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const services = t.raw("services") as Service[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Scale;

            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-6 bg-card p-8">
                    <span
                      className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>

                    <div>
                      <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-border pt-5">
                      <span className="font-display text-2xl text-foreground">
                        {service.price}
                      </span>
                      <span className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                        {service.duration}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2.5 border-t border-border pt-5">
                      {service.deliverables.map((deliverable, dIndex) => (
                        <li
                          key={dIndex}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <ShieldCheck
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
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
