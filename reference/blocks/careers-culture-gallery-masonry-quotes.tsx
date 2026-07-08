import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type GalleryItem = {
  type: "image" | "quote";
  image?: string;
  imageAlt?: string;
  quote?: string;
  name?: string;
  role?: string;
  size: "sm" | "md" | "lg";
};

const SPAN: Record<GalleryItem["size"], string> = {
  sm: "row-span-[16]",
  md: "row-span-[22]",
  lg: "row-span-[30]",
};

export function CareersCultureGalleryMasonryQuotes({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as GalleryItem[];

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
        </Reveal>

        <ul className="mt-14 grid grid-flow-row-dense grid-cols-2 auto-rows-[6px] gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={i} className={cn(SPAN[item.size])}>
              <Reveal delay={i * 50}>
                {item.type === "image" ? (
                  <SmartImage
                    src={item.image ?? ""}
                    alt={item.imageAlt ?? ""}
                    className="h-full w-full rounded-sm"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between rounded-sm bg-secondary p-5 sm:p-6">
                    <p className="font-display text-base leading-snug text-balance text-foreground sm:text-lg">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-6">
                      <p className="text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
