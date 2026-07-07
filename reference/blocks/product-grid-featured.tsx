import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type Product = {
  image: string;
  imageAlt: string;
  collection: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
};

export function ProductGridFeatured({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const products = t.raw("products") as Product[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <a
              href={t("linkHref")}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {t("linkLabel")}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <li key={index}>
              <Reveal delay={index * 60}>
                <article className="flex h-full flex-col gap-5">
                  <div className="relative">
                    <SmartImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="aspect-[4/5] rounded-sm"
                    />
                    {product.badge ? (
                      <span className="absolute top-4 left-4 rounded-sm bg-primary px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground uppercase">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {product.collection}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug tracking-tight text-balance text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <p className="mt-4 text-base font-medium text-foreground">
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
