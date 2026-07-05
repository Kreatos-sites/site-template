import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";

export function LogoMarquee({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  type Logo = { name: string };
  const logos = t.raw("logos") as Logo[];

  return (
    <section
      data-demo="clientes"
      className="border-t border-border py-(--section-gap)"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,14rem)_1fr] lg:items-center">
          <Reveal>
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-border lg:w-16"
              />
              <h2 className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </h2>
            </div>
          </Reveal>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo, index) => (
              <li
                key={logo.name}
                className="border-border border-b border-l last:border-r sm:[&:nth-child(3n)]:border-r sm:[&:nth-child(-n+3)]:border-t lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n)]:border-t lg:[&:nth-child(6n)]:border-r [&:nth-child(2n)]:border-r sm:[&:nth-child(2n)]:border-r-0 [&:nth-child(-n+2)]:border-t"
              >
                <Reveal delay={index * 60}>
                  <div className="group flex min-h-24 items-center justify-center px-6 py-8">
                    <h3 className="font-display text-[clamp(1.35rem,1rem+1.4vw,1.85rem)] leading-none tracking-tight text-balance text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                      {logo.name}
                    </h3>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
