import type { ComponentType } from "react";

import { AboutSplitMetrics } from "./about-split-metrics";
import { BannerStatement } from "./banner-statement";
import { BentoGrid } from "./bento-grid";
import { ComparisonTable } from "./comparison-table";
import { CoverageZones } from "./coverage-zones";
import { CtaInlineSlim } from "./cta-inline-slim";
import { FaqColumns } from "./faq-columns";
import { FaqEditorial } from "./faq-editorial";
import { FeatureAlternatingList } from "./feature-alternating-list";
import { FeatureCardsIcon } from "./feature-cards-icon";
import { FeatureSplitSticky } from "./feature-split-sticky";
import { FeatureZigzag } from "./feature-zigzag";
import { GalleryMasonry } from "./gallery-masonry";
import { GalleryStrip } from "./gallery-strip";
import { LogoGridBordered } from "./logo-grid-bordered";
import { LogoMarquee } from "./logo-marquee";
import { ManifestoSplit } from "./manifesto-split";
import { MetricsColumns } from "./metrics-columns";
import { PricingTiers } from "./pricing-tiers";
import { ProcessHorizontal } from "./process-horizontal";
import { ProcessVertical } from "./process-vertical";
import { ServicesCardsAsym } from "./services-cards-asym";
import { ServicesLedger } from "./services-ledger";
import { SplitCta } from "./split-cta";
import { StatBand } from "./stat-band";
import { StatWall } from "./stat-wall";
import { StepsCards } from "./steps-cards";
import { TeamGrid } from "./team-grid";
import { TestimonialGrid } from "./testimonial-grid";
import { TestimonialQuote } from "./testimonial-quote";

/**
 * BIBLIOTECA DE BLOQUES — motor, NO se edita al personalizar. Secciones curadas
 * de arquetipos DISTINTOS que el agente COMPONE eligiendo del catálogo
 * (components/blocks/catalog.md) + copy en es.json. Se declara como
 * { id: "block", block: "<key>", ns }. Objetivo: variedad sin plantilla.
 */
export const blockSections: Record<string, ComponentType<{ ns: string }>> = {
  "about-split-metrics": AboutSplitMetrics,
  "banner-statement": BannerStatement,
  "bento-grid": BentoGrid,
  "comparison-table": ComparisonTable,
  "coverage-zones": CoverageZones,
  "cta-inline-slim": CtaInlineSlim,
  "faq-columns": FaqColumns,
  "faq-editorial": FaqEditorial,
  "feature-alternating-list": FeatureAlternatingList,
  "feature-cards-icon": FeatureCardsIcon,
  "feature-split-sticky": FeatureSplitSticky,
  "feature-zigzag": FeatureZigzag,
  "gallery-masonry": GalleryMasonry,
  "gallery-strip": GalleryStrip,
  "logo-grid-bordered": LogoGridBordered,
  "logo-marquee": LogoMarquee,
  "manifesto-split": ManifestoSplit,
  "metrics-columns": MetricsColumns,
  "pricing-tiers": PricingTiers,
  "process-horizontal": ProcessHorizontal,
  "process-vertical": ProcessVertical,
  "services-cards-asym": ServicesCardsAsym,
  "services-ledger": ServicesLedger,
  "split-cta": SplitCta,
  "stat-band": StatBand,
  "stat-wall": StatWall,
  "steps-cards": StepsCards,
  "team-grid": TeamGrid,
  "testimonial-grid": TestimonialGrid,
  "testimonial-quote": TestimonialQuote,
};
