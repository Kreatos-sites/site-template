import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * Rating real de la ficha de Google (config.business.maps).
 * Enlaza siempre a maps.uri: el dato es verificable, no decorativo.
 * Sin ficha de Google (maps omitido) no renderiza nada.
 */
export function GoogleRatingBadge({ className }: { className?: string }) {
  const t = useTranslations("common");
  const maps = config.business.maps;
  if (!maps) return null;
  const { rating, reviewsCount, uri } = maps;

  return (
    <a
      href={uri}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("viewOnGoogle")}
      className={cn(
        "group inline-flex items-center gap-2 text-sm",
        className,
      )}
    >
      <span className="flex items-center gap-1 font-semibold text-primary">
        <Star className="size-4 fill-current" aria-hidden="true" />
        {rating.toFixed(1)}
      </span>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
        {t("googleRating", { rating: rating.toFixed(1) })} ·{" "}
        {t("googleReviews", { count: reviewsCount })}
      </span>
    </a>
  );
}
