import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";
import {
  BuildingIcon,
  UsersIcon,
  TrophyIcon,
  InfoIcon,
  BriefcaseIcon,
} from "@phosphor-icons/react/dist/ssr";

type Stat = { value: string; label: string };
type Tab = { id: string; icon: string; label: string; heading: string; body: string; items: string[] };

const TAB_ICONS: Record<string, typeof BuildingIcon> = {
  building: BuildingIcon,
  users: UsersIcon,
  trophy: TrophyIcon,
  info: InfoIcon,
  briefcase: BriefcaseIcon,
};

export function AboutOrganizationProfileCardCoverStatsTabs({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const tabs = t.raw("tabs") as Tab[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative">
              <SmartImage src={t("coverImage")} alt={t("coverImageAlt")} className="aspect-[16/6] w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            <div className="px-8 pb-8 lg:px-10">
              <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-5">
                  <SmartImage
                    src={t("avatarImage")}
                    alt={t("avatarImageAlt")}
                    className="aspect-square size-24 shrink-0 rounded-full border-4 border-card"
                  />
                  <div className="pb-1">
                    <h3 className="font-display text-2xl text-foreground">{t("name")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t("role")}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-3 pb-1">
                  <span className="inline-flex items-center rounded-sm border border-border px-4 py-2 text-sm font-medium text-foreground">
                    {t("locationLabel")}
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    {t("contactLabel")}
                  </span>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("bio")}</p>

              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col gap-1 bg-card p-5">
                    <span className="font-display text-2xl text-foreground">{s.value}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/*
            Tabs 100% CSS (radios ocultos + peer-checked). Cada input, la
            etiqueta y el panel viven como hermanos directos de este
            contenedor para que los selectores `peer-checked/<id>` se
            alcancen entre sí sin JavaScript de cliente.
          */}
          <div className="relative mt-10">
            {tabs.map((tab, i) => (
              <input
                key={`tab-radio-${tab.id}`}
                type="radio"
                name="profile-tabs"
                id={`profile-tab-${tab.id}`}
                defaultChecked={i === 0}
                className={cn("peer sr-only", `peer/${tab.id}`)}
              />
            ))}

            <div className="flex flex-wrap gap-2 border-b border-border">
              {tabs.map((tab) => {
                const TabIcon = TAB_ICONS[tab.icon] ?? InfoIcon;
                return (
                  <label
                    key={`tab-label-${tab.id}`}
                    htmlFor={`profile-tab-${tab.id}`}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-colors",
                      `peer-checked/${tab.id}:border-primary peer-checked/${tab.id}:text-foreground`,
                    )}
                  >
                    <TabIcon className="size-4" />
                    {tab.label}
                  </label>
                );
              })}
            </div>

            {tabs.map((tab) => (
              <div
                key={`tab-panel-${tab.id}`}
                className={cn("hidden pt-8", `peer-checked/${tab.id}:block`)}
              >
                <h4 className="font-display text-lg text-foreground">{tab.heading}</h4>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{tab.body}</p>
                {tab.items.length > 0 && (
                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {tab.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
