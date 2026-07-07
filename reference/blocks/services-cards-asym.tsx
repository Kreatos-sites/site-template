import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  featured?: boolean;
};

export function ServicesCardsAsym({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const services = t.raw("services") as Service[];

  const featuredIndex = services.findIndex((s) => s.featured);
  const heroIndex = featuredIndex >= 0 ? featuredIndex : 0;
  const hero = services[heroIndex];
  const rest = services.filter((_, i) => i !== heroIndex);

  const numberOf = (service: Service) =>
    String(services.indexOf(service) + 1).padStart(2, "0");

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <span
              aria-hidden="true"
              className="hidden font-display text-[clamp(3rem,6vw,5rem)] leading-none text-muted-foreground/30 lg:block"
            >
              {String(services.length).padStart(2, "0")}
            </span>
          </Reveal>
        </header>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {hero ? (
            <Reveal className="lg:col-span-7 lg:row-span-2">
              <article className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground lg:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary-foreground/10 blur-2xl"
                />
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-sm tracking-[0.3em] text-primary-foreground/70">
                    {numberOf(hero)}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-7 text-primary-foreground/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <div className="relative mt-16 max-w-lg">
                  <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-balance">
                    {hero.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                    {hero.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ) : null}

          <div className="grid gap-4 lg:col-span-5">
            {rest.map((service, index) => (
              <Reveal key={service.title} delay={index * 70}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col justify-between gap-8 rounded-3xl border border-border bg-card p-7 transition-colors duration-300 hover:border-primary/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                      {numberOf(service)}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
