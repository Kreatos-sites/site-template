import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

type ExhibitPiece = {
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  year: string;
};

export function ExhibitionFramedMetadata({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const pieces = t.raw("pieces") as ExhibitPiece[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((piece, i) => (
            <li key={i} className="contents">
              <Reveal delay={i * 60}>
                <article className="group flex flex-col">
                  <div
                    className={cn(
                      "border border-border bg-card p-3 shadow-sm transition-shadow duration-300",
                      "group-hover:shadow-md",
                    )}
                  >
                    <div className="overflow-hidden border border-border">
                      <SmartImage
                        src={piece.image}
                        alt={piece.imageAlt}
                        className={cn(
                          "aspect-[4/5] rounded-none grayscale-[15%] transition-all duration-500 ease-out",
                          "group-hover:grayscale-0",
                        )}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-2 text-center">
                    <span className="inline-flex w-fit items-center rounded-sm border border-border bg-secondary px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-secondary-foreground uppercase">
                      {piece.category}
                    </span>
                    <h3 className="font-display text-lg text-foreground">
                      {piece.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{piece.year}</p>
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
