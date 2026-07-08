import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  Gauge,
  ShieldCheck,
  Workflow,
  Radar,
  Cpu,
  Boxes,
  type LucideIcon,
} from "lucide-react";

type Capability = { icon: string; title: string; text: string };

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge,
  shield: ShieldCheck,
  workflow: Workflow,
  radar: Radar,
  cpu: Cpu,
  boxes: Boxes,
};

export function FeatureDiagonalClipPanels({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const capabilities = t.raw("capabilities") as Capability[];

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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => {
            const Icon = ICONS[capability.icon] ?? Gauge;
            const tinted = i % 2 === 0;
            const offset = i % 3 === 1 ? "lg:translate-y-10" : i % 3 === 2 ? "lg:-translate-y-6" : "";
            const clip =
              i % 2 === 0
                ? "[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]"
                : "[clip-path:polygon(0_0,100%_0,100%_100%,0_92%)]";

            return (
              <li key={i} className={`${offset}`}>
                <Reveal delay={i * 60}>
                  <article
                    className={`relative flex h-full flex-col gap-6 p-8 pb-12 ${clip} ${
                      tinted ? "bg-primary/10" : "bg-secondary"
                    }`}
                  >
                    <span className="inline-flex size-14 items-center justify-center rounded-md bg-background">
                      <Icon className="size-7 text-primary" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {capability.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {capability.text}
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
