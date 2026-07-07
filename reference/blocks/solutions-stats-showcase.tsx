import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  BarChart3,
  Boxes,
  Cloud,
  Cpu,
  Database,
  LineChart,
  Lock,
  Network,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  workflow: Workflow,
  cloud: Cloud,
  database: Database,
  shield: ShieldCheck,
  network: Network,
  cpu: Cpu,
  boxes: Boxes,
  chart: LineChart,
  bars: BarChart3,
  lock: Lock,
};

type Solution = {
  icon: string;
  title: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
};

type Client = {
  name: string;
  image: string;
  imageAlt: string;
};

export function SolutionsStatsShowcase({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const solutions = t.raw("solutions") as Solution[];
  const stats = t.raw("stats") as Stat[];
  const clients = t.raw("clients") as Client[];

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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => {
            const Icon = ICONS[solution.icon] ?? Workflow;
            return (
              <li key={index} className="contents">
                <Reveal delay={index * 60}>
                  <article className="flex h-full flex-col gap-5 bg-card p-8">
                    <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    <div>
                      <h3 className="font-display text-lg text-foreground">
                        {solution.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {solution.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <dl className="mt-16 grid grid-cols-2 gap-8 rounded-lg border border-border bg-secondary/40 p-8 sm:grid-cols-4 sm:p-10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-16">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {t("clientsLabel")}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {clients.map((client, index) => (
                <li key={index} className="contents">
                  <article className="group flex aspect-[3/2] items-center justify-center bg-card p-6 transition-colors duration-300 hover:bg-secondary">
                    <SmartImage
                      src={client.image}
                      alt={client.imageAlt}
                      className="aspect-square opacity-60 grayscale transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
