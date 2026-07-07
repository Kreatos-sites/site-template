import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Building2,
  Cloud,
  Cpu,
  Database,
  Globe,
  ServerCog,
  ShieldCheck,
  SquareCode,
  type LucideIcon,
} from "lucide-react";

type Partner = { icon: string; name: string };

const ICONS: Record<string, LucideIcon> = {
  cloud: Cloud,
  database: Database,
  server: ServerCog,
  code: SquareCode,
  chip: Cpu,
  shield: ShieldCheck,
  building: Building2,
  globe: Globe,
};

export function LogoCloudGridFourColumnCard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const partners = t.raw("partners") as Partner[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
          </div>
        </Reveal>
        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {partners.map((partner, i) => {
            const Icon = ICONS[partner.icon] ?? Globe;
            return (
              <li key={partner.name} className="contents">
                <Reveal delay={i * 60}>
                  <article className="flex h-full flex-col items-center justify-center gap-3 rounded-sm border border-border bg-card px-4 py-8 text-center">
                    <Icon className="size-8 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{partner.name}</span>
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
