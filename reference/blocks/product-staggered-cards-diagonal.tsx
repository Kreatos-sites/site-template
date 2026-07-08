import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type Product = {
  image: string;
  imageAlt: string;
  collection: string;
  name: string;
  price: string;
};

export function ProductStaggeredCardsDiagonal({ ns }: { ns: string }) {
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

        <ul className="mt-24 grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product, index) => {
            const isOffset = index % 2 === 1;
            return (
              <li
                key={index}
                className={
                  isOffset
                    ? "sm:translate-y-16 lg:translate-y-20"
                    : "sm:-translate-y-4 lg:translate-y-0"
                }
              >
                <Reveal delay={index * 70}>
                  <article className="flex h-full flex-col gap-5">
                    <div className="relative overflow-hidden">
                      <SmartImage
                        src={product.image}
                        alt={product.imageAlt}
                        className="aspect-[3/4] rounded-sm"
                      />
                    </div>
                    <div className="flex flex-1 flex-col border-t border-border pt-4">
                      <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                        {product.collection}
                      </p>
                      <h3 className="mt-2 font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm font-medium text-foreground">
                        {product.price}
                      </p>
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
