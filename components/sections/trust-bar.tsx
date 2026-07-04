import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import type { SectionOf } from "@/lib/config";
import { yearsInBusiness } from "@/lib/config";
import config from "@/site.config";

/**
 * Banda de datos verificables: años (calculados desde founded, si existe),
 * rating y reseñas reales de la ficha de Google. Nada inventado: si
 * `founded` o `maps` no están en la config, esos ítems no se muestran.
 */
export function TrustBar({ ns }: SectionOf<"trust-bar">) {
  const t = useTranslations(ns ?? "trust-bar");
  const tCommon = useTranslations("common");
  const years = yearsInBusiness(config.business);
  const maps = config.business.maps;

  const items: { value: string; label: string; icon?: boolean; href?: string }[] = [
    ...(years !== null ? [{ value: String(years), label: t("yearsLabel") }] : []),
    ...(maps
      ? [
          {
            value: maps.rating.toFixed(1),
            label: t("ratingLabel"),
            icon: true,
            href: maps.uri,
          },
          {
            value: String(maps.reviewsCount),
            label: t("reviewsLabel"),
            href: maps.uri,
          },
        ]
      : []),
  ];

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center lg:px-8">
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {items.map((item) => {
            const content = (
              <>
                <span className="flex items-center gap-1.5 font-display text-3xl text-primary tabular-nums">
                  {item.icon && (
                    <Star className="size-5 fill-current" aria-hidden="true" />
                  )}
                  {item.value}
                </span>
                <span className="mt-1 block text-xs tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </span>
              </>
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tCommon("viewOnGoogle")}
                    className="block transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
        <p className="max-w-52 text-sm text-muted-foreground sm:text-right">
          {t("cityLabel")}
        </p>
      </div>
    </section>
  );
}
