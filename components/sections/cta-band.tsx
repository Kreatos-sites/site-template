import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import type { SectionOf } from "@/lib/config";
import { whatsappDigits } from "@/lib/config";
import config from "@/site.config";

export function CtaBand({ ns }: SectionOf<"cta-band">) {
  const t = useTranslations(ns ?? "cta-band");
  const tCommon = useTranslations("common");
  const phoneHref = `tel:${config.business.phone.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${whatsappDigits(config.business)}?text=${encodeURIComponent(
    tCommon("whatsappMessage"),
  )}`;

  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.6rem,1.1rem+2vw,2.5rem)] leading-[1.1] tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="mt-3 text-[0.98rem] opacity-85">{t("subtitle")}</p>
        </Reveal>
        <Reveal delay={120} className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <a href={phoneHref}>
              <Phone className="size-4" aria-hidden="true" />
              {t("primaryCta")}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              {t("secondaryCta")}
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
