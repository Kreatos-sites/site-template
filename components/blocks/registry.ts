import type { ComponentType } from "react";

import { AboutSplitMetrics } from "./about-split-metrics";
import { BannerStatement } from "./banner-statement";
import { BentoGrid } from "./bento-grid";
import { ComparisonTable } from "./comparison-table";
import { FaqEditorial } from "./faq-editorial";
import { FeatureAlternatingList } from "./feature-alternating-list";
import { FeatureCardsIcon } from "./feature-cards-icon";
import { FeatureZigzag } from "./feature-zigzag";
import { GalleryMasonry } from "./gallery-masonry";
import { LogoMarquee } from "./logo-marquee";
import { ProcessHorizontal } from "./process-horizontal";
import { ServicesLedger } from "./services-ledger";
import { SplitCta } from "./split-cta";
import { StatBand } from "./stat-band";
import { StatWall } from "./stat-wall";
import { TestimonialQuote } from "./testimonial-quote";

/**
 * BIBLIOTECA DE BLOQUES — motor, NO se edita al personalizar (a diferencia de
 * components/custom/, que el agente escribe). Secciones curadas, probadas y de
 * arquetipos DISTINTOS que el agente COMPONE eligiendo del catálogo
 * (components/blocks/catalog.md) y llenando su copy en messages/es.json. Se
 * declara en site.config.ts como { id: "block", block: "<key>", ns: "<ns>" }.
 * Objetivo: que "distintivo" sea el camino fácil → menos sitios a plantilla.
 */
export const blockSections: Record<string, ComponentType<{ ns: string }>> = {
  "banner-statement": BannerStatement,
  "bento-grid": BentoGrid,
  "comparison-table": ComparisonTable,
  "faq-editorial": FaqEditorial,
  "feature-alternating-list": FeatureAlternatingList,
  "feature-cards-icon": FeatureCardsIcon,
  "feature-zigzag": FeatureZigzag,
  "gallery-masonry": GalleryMasonry,
  "logo-marquee": LogoMarquee,
  "process-horizontal": ProcessHorizontal,
  "services-ledger": ServicesLedger,
  "split-cta": SplitCta,
  "stat-band": StatBand,
  "stat-wall": StatWall,
  "testimonial-quote": TestimonialQuote,
"about-split-metrics": AboutSplitMetrics,
};
