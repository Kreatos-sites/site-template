import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import { ChevronUp, Users } from "lucide-react";

type Contributor = {
  name: string;
  avatar: string;
};

type RoadmapItem = {
  title: string;
  description: string;
  category: string;
  status: "planned" | "in-progress" | "shipped";
  votes: number;
  progress?: number;
  contributors?: Contributor[];
};

const STATUS_STYLES: Record<RoadmapItem["status"], string> = {
  planned: "border border-border bg-secondary text-secondary-foreground",
  "in-progress": "border border-primary/40 bg-primary/10 text-primary",
  shipped: "border border-primary bg-primary text-primary-foreground",
};

export function RoadmapFeatureRequestsUpvoteInteractive({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as RoadmapItem[];
  const statusLabels = t.raw("statusLabels") as Record<RoadmapItem["status"], string>;

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{t("description")}</p>
        </Reveal>

        <ul className="mt-14 flex flex-col gap-4">
          {items.map((item, i) => (
            <li key={i}>
              <Reveal delay={i * 60}>
                <article className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6 sm:flex-row sm:gap-6">
                  <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col sm:items-center sm:justify-center sm:gap-1 sm:rounded-md sm:border sm:border-border sm:bg-secondary sm:px-4 sm:py-3">
                    <ChevronUp className="size-4 text-primary" strokeWidth={2} aria-hidden="true" />
                    <span className="font-display text-lg text-foreground">{item.votes}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                      <span
                        className={cn(
                          "rounded-sm px-2 py-0.5 text-xs font-medium",
                          STATUS_STYLES[item.status],
                        )}
                      >
                        {statusLabels[item.status]}
                      </span>
                      <span className="rounded-sm border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

                    {item.status === "in-progress" && typeof item.progress === "number" ? (
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                        <div className="h-2 w-full max-w-56 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>

                        {item.contributors && item.contributors.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {item.contributors.map((contributor, ci) => (
                                <SmartImage
                                  key={ci}
                                  src={contributor.avatar}
                                  alt={contributor.name}
                                  className="aspect-square size-7 rounded-full border border-background"
                                />
                              ))}
                            </div>
                            <Users className="size-4 text-muted-foreground" strokeWidth={1.75} aria-hidden="true" />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
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
