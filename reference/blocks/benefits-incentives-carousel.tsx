import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  BadgeCheck,
  Headset,
  PackageCheck,
  ShieldCheck,
  Truck,
  Undo2,
  type LucideIcon,
} from "lucide-react";

type Incentive = {
  icon: string;
  title: string;
  description: string;
};

const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  shield: ShieldCheck,
  headset: Headset,
  undo: Undo2,
  package: PackageCheck,
  badge: BadgeCheck,
};

export function BenefitsIncentivesCarousel({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const incentives = t.raw("incentives") as Incentive[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <ul
            className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="list"
          >
            {incentives.map((incentive, index) => {
              const Icon = ICONS[incentive.icon] ?? BadgeCheck;

              return (
                <li
                  key={index}
                  className="flex w-[16rem] shrink-0 snap-start flex-col gap-5 rounded-lg border border-border bg-card p-7 sm:w-[18rem]"
                >
                  <span
                    className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground">
                      {incentive.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {incentive.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
