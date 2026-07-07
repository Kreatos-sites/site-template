import type { ComponentType } from "react";

import { AboutPortrait } from "./about-portrait";
import { AboutSplitMetrics } from "./about-split-metrics";
import { BannerImage } from "./banner-image";
import { BannerStatement } from "./banner-statement";
import { BentoGrid } from "./bento-grid";
import { CalloutQuote } from "./callout-quote";
import { CertificationsBand } from "./certifications-band";
import { ComparisonTable } from "./comparison-table";
import { ContactHero } from "./contact-hero";
import { CoverageZones } from "./coverage-zones";
import { CtaBandCentered } from "./cta-band-centered";
import { CtaBgImage } from "./cta-bg-image";
import { CtaInlineSlim } from "./cta-inline-slim";
import { DownloadBrochure } from "./download-brochure";
import { EditorialIntro } from "./editorial-intro";
import { FaqColumns } from "./faq-columns";
import { FaqEditorial } from "./faq-editorial";
import { FeatureAlternatingList } from "./feature-alternating-list";
import { FeatureBgSplit } from "./feature-bg-split";
import { FeatureCardsIcon } from "./feature-cards-icon";
import { FeatureListChecks } from "./feature-list-checks";
import { FeatureSplitSticky } from "./feature-split-sticky";
import { FeatureZigzag } from "./feature-zigzag";
import { GalleryDuo } from "./gallery-duo";
import { GalleryMasonry } from "./gallery-masonry";
import { GalleryStrip } from "./gallery-strip";
import { HistoryTimeline } from "./history-timeline";
import { HoursLocations } from "./hours-locations";
import { ImageFullbleedCaption } from "./image-fullbleed-caption";
import { LogoGridBordered } from "./logo-grid-bordered";
import { LogoMarquee } from "./logo-marquee";
import { LogosMarqueeScroll } from "./logos-marquee-scroll";
import { ManifestoSplit } from "./manifesto-split";
import { MetricStatementSplit } from "./metric-statement-split";
import { MetricsColumns } from "./metrics-columns";
import { OffsetCards } from "./offset-cards";
import { PricingTiers } from "./pricing-tiers";
import { ProcessHorizontal } from "./process-horizontal";
import { ProcessVertical } from "./process-vertical";
import { ProductSpecTable } from "./product-spec-table";
import { ServicesCardsAsym } from "./services-cards-asym";
import { ServicesIndex } from "./services-index";
import { ServicesLedger } from "./services-ledger";
import { SplitCta } from "./split-cta";
import { StatBand } from "./stat-band";
import { StatBgImage } from "./stat-bg-image";
import { StatWall } from "./stat-wall";
import { StepsCards } from "./steps-cards";
import { TeamGrid } from "./team-grid";
import { TestimonialGrid } from "./testimonial-grid";
import { TestimonialQuote } from "./testimonial-quote";
import { ValuesCards } from "./values-cards";

/**
 * BIBLIOTECA DE BLOQUES — motor, NO se edita. Arquetipos DISTINTOS que el agente
 * COMPONE eligiendo del catálogo (catalog.md) + copy en es.json. Declarar como
 * { id: "block", block: "<key>", ns }. Cada sitio ademas lleva 1-2 custom de firma.
 */
export const blockSections: Record<string, ComponentType<{ ns: string }>> = {
  "about-portrait": AboutPortrait,
  "about-split-metrics": AboutSplitMetrics,
  "banner-image": BannerImage,
  "banner-statement": BannerStatement,
  "bento-grid": BentoGrid,
  "callout-quote": CalloutQuote,
  "certifications-band": CertificationsBand,
  "comparison-table": ComparisonTable,
  "contact-hero": ContactHero,
  "coverage-zones": CoverageZones,
  "cta-band-centered": CtaBandCentered,
  "cta-bg-image": CtaBgImage,
  "cta-inline-slim": CtaInlineSlim,
  "download-brochure": DownloadBrochure,
  "editorial-intro": EditorialIntro,
  "faq-columns": FaqColumns,
  "faq-editorial": FaqEditorial,
  "feature-alternating-list": FeatureAlternatingList,
  "feature-bg-split": FeatureBgSplit,
  "feature-cards-icon": FeatureCardsIcon,
  "feature-list-checks": FeatureListChecks,
  "feature-split-sticky": FeatureSplitSticky,
  "feature-zigzag": FeatureZigzag,
  "gallery-duo": GalleryDuo,
  "gallery-masonry": GalleryMasonry,
  "gallery-strip": GalleryStrip,
  "history-timeline": HistoryTimeline,
  "hours-locations": HoursLocations,
  "image-fullbleed-caption": ImageFullbleedCaption,
  "logo-grid-bordered": LogoGridBordered,
  "logo-marquee": LogoMarquee,
  "logos-marquee-scroll": LogosMarqueeScroll,
  "manifesto-split": ManifestoSplit,
  "metric-statement-split": MetricStatementSplit,
  "metrics-columns": MetricsColumns,
  "offset-cards": OffsetCards,
  "pricing-tiers": PricingTiers,
  "process-horizontal": ProcessHorizontal,
  "process-vertical": ProcessVertical,
  "product-spec-table": ProductSpecTable,
  "services-cards-asym": ServicesCardsAsym,
  "services-index": ServicesIndex,
  "services-ledger": ServicesLedger,
  "split-cta": SplitCta,
  "stat-band": StatBand,
  "stat-bg-image": StatBgImage,
  "stat-wall": StatWall,
  "steps-cards": StepsCards,
  "team-grid": TeamGrid,
  "testimonial-grid": TestimonialGrid,
  "testimonial-quote": TestimonialQuote,
  "values-cards": ValuesCards,
};
