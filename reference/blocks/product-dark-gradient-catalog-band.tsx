import { useTranslations } from "next-intl";
import { ArrowUpRight, Boxes } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Product = {
  sku: string;
  name: string;
  spec: string;
  price: string;
  available: boolean;
};

export function ProductDarkGradientCatalogBand({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const products = t.raw("products") as Product[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-foreground py-(--section-gap)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-primary opacity-25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 h-[16rem] w-[16rem] rounded-full bg-primary opacity-30 blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-background">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-background/60">
                {t("description")}
              </p>
            </div>
            <a
              href={t("linkHref")}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-background underline-offset-4 hover:text-primary hover:underline"
            >
              {t("linkLabel")}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <li key={product.sku}>
              <Reveal delay={index * 40}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col justify-between gap-6 rounded-sm border border-background/15 bg-background/5 p-5",
                    "transition-colors duration-300 hover:border-primary/60 hover:bg-background/10",
                    "focus-within:border-primary/60",
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-primary/0 transition-all duration-300 group-hover:ring-primary/50"
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <Boxes
                      className="size-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "rounded-sm px-2 py-0.5 text-[0.65rem] font-medium tracking-[0.15em] uppercase",
                        product.available
                          ? "bg-primary/15 text-primary"
                          : "bg-background/10 text-background/45",
                      )}
                    >
                      {product.available
                        ? t("availableLabel")
                        : t("unavailableLabel")}
                    </span>
                  </div>
                  <div className="relative">
                    <p className="text-[0.65rem] font-medium tracking-[0.2em] text-background/40 uppercase">
                      {product.sku}
                    </p>
                    <h3 className="mt-2 font-display text-base leading-snug text-balance text-background">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-background/55">
                      {product.spec}
                    </p>
                    <p className="mt-4 text-sm font-medium text-background">
                      {product.price}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
