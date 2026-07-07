import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import {
  HelpCircle,
  FileText,
  Clock,
  Wallet,
  ShieldCheck,
  Truck,
  MessageCircle,
  Settings,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  help: HelpCircle,
  file: FileText,
  clock: Clock,
  wallet: Wallet,
  shield: ShieldCheck,
  truck: Truck,
  message: MessageCircle,
  settings: Settings,
};

type FaqItem = { icon: string; question: string; answer: string };

export function FaqListIconDivider({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const items = t.raw("items") as FaqItem[];

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
        </Reveal>

        <ul className="mt-16 divide-y divide-border border-t border-border">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon] ?? HelpCircle;
            return (
              <li key={index}>
                <Reveal delay={index * 60}>
                  <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-[2.5rem_1fr] sm:gap-6 lg:grid-cols-[2.5rem_minmax(0,22rem)_1fr] lg:gap-10">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-primary">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground lg:pt-2">
                      {item.question}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground lg:pt-2">
                      {item.answer}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
