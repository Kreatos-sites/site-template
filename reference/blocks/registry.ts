import type { ComponentType } from "react";

import { AboutMissionCenteredWithMetricUnderline } from "./about-mission-centered-with-metric-underline";
import { AboutMissionStatementMetricsStrip } from "./about-mission-statement-metrics-strip";
import { AboutNarrativeTeamPhotoMetrics } from "./about-narrative-team-photo-metrics";
import { AboutNarrativeWithMetricsRow } from "./about-narrative-with-metrics-row";
import { AccordionFaqSingleColumn } from "./accordion-faq-single-column";
import { AgentContactFormMapLocations } from "./agent-contact-form-map-locations";
import { AnalyticsChartWithKpiSummary } from "./analytics-chart-with-kpi-summary";
import { AnalyticsKpiChartWithTrends } from "./analytics-kpi-chart-with-trends";
import { AnnouncementCenteredWithCta } from "./announcement-centered-with-cta";
import { ArchitecturalProjectsGrid } from "./architectural-projects-grid";
import { ArticleDocumentationWithPagination } from "./article-documentation-with-pagination";
import { ArticleFooterSocialShareTags } from "./article-footer-social-share-tags";
import { BenefitsIncentivesCarousel } from "./benefits-incentives-carousel";
import { BlogArticleCenteredAuthorShare } from "./blog-article-centered-author-share";
import { BlogGuideStickyTocNavigation } from "./blog-guide-sticky-toc-navigation";
import { BorderedConversionPanelSplit } from "./bordered-conversion-panel-split";
import { BrandPartnersGrid } from "./brand-partners-grid";
import { CallBookingClosure } from "./call-booking-closure";
import { CaseStudyImmersive } from "./case-study-immersive";
import { ChangelogVersionedGroupedRail } from "./changelog-versioned-grouped-rail";
import { ClinicMetricsAnimatedBand } from "./clinic-metrics-animated-band";
import { CompanyHistoryAlternatingSpine } from "./company-history-alternating-spine";
import { CompanyMissionIntroWithMetrics } from "./company-mission-intro-with-metrics";
import { ComparisonBilateralConversionCta } from "./comparison-bilateral-conversion-cta";
import { ComparisonPlansTableStickyHeader } from "./comparison-plans-table-sticky-header";
import { ComparisonTable3PlanMatrix } from "./comparison-table-3-plan-matrix";
import { ComparisonUsVsThemCheckCrossDuality } from "./comparison-us-vs-them-check-cross-duality";
import { CompetitiveAdvantageComparison } from "./competitive-advantage-comparison";
import { ContactChannelCardsHoverGrid } from "./contact-channel-cards-hover-grid";
import { ContactChannelListSplitForm } from "./contact-channel-list-split-form";
import { ContactFormCenteredCard } from "./contact-form-centered-card";
import { ContactFormParallaxSupport } from "./contact-form-parallax-support";
import { ContactFormTopicPills } from "./contact-form-topic-pills";
import { ContactImageFloatingCard } from "./contact-image-floating-card";
import { ContactLocationsMapForm } from "./contact-locations-map-form";
import { ContactSingleCardFormPrivacy } from "./contact-single-card-form-privacy";
import { CulinaryStaffShowcase } from "./culinary-staff-showcase";
import { DepartmentBasedJobsListing } from "./department-based-jobs-listing";
import { DiningCategoriesVisualGrid } from "./dining-categories-visual-grid";
import { EmailCaptureBandHorizontal } from "./email-capture-band-horizontal";
import { EmailCaptureClosing } from "./email-capture-closing";
import { EmptyStateDualActionCentered } from "./empty-state-dual-action-centered";
import { ExhibitionFramedMetadata } from "./exhibition-framed-metadata";
import { ExpandablePricingFeatures } from "./expandable-pricing-features";
import { FaqAccordionMinimalTextOnly } from "./faq-accordion-minimal-text-only";
import { FaqAccordionStickySupportSidebar } from "./faq-accordion-sticky-support-sidebar";
import { FaqAccordionTintedBackground } from "./faq-accordion-tinted-background";
import { FaqAccordionTwoColumnBalanced } from "./faq-accordion-two-column-balanced";
import { FaqAccordionTwoColumnBordered } from "./faq-accordion-two-column-bordered";
import { FaqEditorialSidebarSync } from "./faq-editorial-sidebar-sync";
import { FaqGridCardsExpandable } from "./faq-grid-cards-expandable";
import { FaqListIconDivider } from "./faq-list-icon-divider";
import { FaqSupportCtaHybrid } from "./faq-support-cta-hybrid";
import { FaqTabbedSearchableCategories } from "./faq-tabbed-searchable-categories";
import { FaqTabsLiveSearch } from "./faq-tabs-live-search";
import { FeatureAlternatingSplitImage } from "./feature-alternating-split-image";
import { FeatureAsymmetricBentoMotionFocus } from "./feature-asymmetric-bento-motion-focus";
import { FeatureCardsAnimatedScroll } from "./feature-cards-animated-scroll";
import { FeatureCardsImageGrid } from "./feature-cards-image-grid";
import { FeatureCarouselSlides } from "./feature-carousel-slides";
import { FeatureDenseChecklistTwoColumn } from "./feature-dense-checklist-two-column";
import { FeatureIconGridCapabilities } from "./feature-icon-grid-capabilities";
import { FeatureInteractiveGridAutoCyclePulse } from "./feature-interactive-grid-auto-cycle-pulse";
import { FeatureStickyScrollStackOffsetAnimation } from "./feature-sticky-scroll-stack-offset-animation";
import { FeatureTabbedGridCategorySwap } from "./feature-tabbed-grid-category-swap";
import { FeaturesAlternatingDenseCopyImage } from "./features-alternating-dense-copy-image";
import { FeaturesAlternatingSplitBulletNarrative } from "./features-alternating-split-bullet-narrative";
import { FeaturesDenseCheckboxList } from "./features-dense-checkbox-list";
import { FeaturesTabbedIconGrid } from "./features-tabbed-icon-grid";
import { FooterAsymmetricSplit } from "./footer-asymmetric-split";
import { FooterCompactInlineBar } from "./footer-compact-inline-bar";
import { FooterCompactInlineRow } from "./footer-compact-inline-row";
import { FooterDiagonalStripe } from "./footer-diagonal-stripe";
import { FooterGiantWordmarkStatementClose } from "./footer-giant-wordmark-statement-close";
import { FooterGridBlueprintBordered } from "./footer-grid-blueprint-bordered";
import { FooterGridBorderedCellsNewsletter } from "./footer-grid-bordered-cells-newsletter";
import { FooterGridNewsletterThemed } from "./footer-grid-newsletter-themed";
import { FooterMegaLocalized } from "./footer-mega-localized";
import { FooterMegaMulticolumnLocaleTheme } from "./footer-mega-multicolumn-locale-theme";
import { FooterMultiColumnSitemapLocaleTheme } from "./footer-multi-column-sitemap-locale-theme";
import { FooterVerticalDividersSplit } from "./footer-vertical-dividers-split";
import { FooterWordmarkProminentOutline } from "./footer-wordmark-prominent-outline";
import { FullWidthConversionBanner } from "./full-width-conversion-banner";
import { GalleryBentoHeroSupportingTiles } from "./gallery-bento-hero-supporting-tiles";
import { GalleryEditorialGrayscaleIndexed } from "./gallery-editorial-grayscale-indexed";
import { GalleryFilterablePortfolio } from "./gallery-filterable-portfolio";
import { GalleryGridMetricsColumn } from "./gallery-grid-metrics-column";
import { GalleryGridResponsiveUniform } from "./gallery-grid-responsive-uniform";
import { GalleryGridUniformResponsive } from "./gallery-grid-uniform-responsive";
import { GalleryGridWithStatsColumn } from "./gallery-grid-with-stats-column";
import { GalleryHoverRevealPortfolio } from "./gallery-hover-reveal-portfolio";
import { GalleryMarqueeInfiniteEdgeMask } from "./gallery-marquee-infinite-edge-mask";
import { GalleryMasonryCaptionHover } from "./gallery-masonry-caption-hover";
import { GalleryMasonryCssColumnsOverlay } from "./gallery-masonry-css-columns-overlay";
import { GalleryMasonryHoverOverlay } from "./gallery-masonry-hover-overlay";
import { GalleryMasonryOffsetVariableReveal } from "./gallery-masonry-offset-variable-reveal";
import { GalleryMasonryOverlayCards } from "./gallery-masonry-overlay-cards";
import { GalleryMotionGridFourTileHover } from "./gallery-motion-grid-four-tile-hover";
import { GalleryOffsetMasonryVariedHeights } from "./gallery-offset-masonry-varied-heights";
import { GallerySpotlightCarouselCrossfade } from "./gallery-spotlight-carousel-crossfade";
import { GallerySpotlightCarouselThumbrail } from "./gallery-spotlight-carousel-thumbrail";
import { GalleryWall4tileMotionHover } from "./gallery-wall-4tile-motion-hover";
import { GalleryWallHoverReveal } from "./gallery-wall-hover-reveal";
import { HeaderCenteredUnderlineHover } from "./header-centered-underline-hover";
import { HeaderEditorialWordmarkSlashes } from "./header-editorial-wordmark-slashes";
import { HeaderFlatMonochromeDrawer } from "./header-flat-monochrome-drawer";
import { HeaderFullWidthMarketingCta } from "./header-full-width-marketing-cta";
import { HeaderFullWidthResponsive } from "./header-full-width-responsive";
import { HeaderSplitAsymmetricAuthCluster } from "./header-split-asymmetric-auth-cluster";
import { HeaderSplitAuth } from "./header-split-auth";
import { HeaderSplitAuthCluster } from "./header-split-auth-cluster";
import { HeaderStickyBlurredNavigation } from "./header-sticky-blurred-navigation";
import { HeaderStickyScrollMorphingBlur } from "./header-sticky-scroll-morphing-blur";
import { HeroConversionLandingComplete } from "./hero-conversion-landing-complete";
import { HeroCustomerSuccessStory } from "./hero-customer-success-story";
import { HeroEditorialWithStatHairline } from "./hero-editorial-with-stat-hairline";
import { HeroEmailWaitlistStatsFlow } from "./hero-email-waitlist-stats-flow";
import { HeroImageCarousel } from "./hero-image-carousel";
import { HeroMinimalistStatement } from "./hero-minimalist-statement";
import { HeroMobileAppShowcase } from "./hero-mobile-app-showcase";
import { HeroParallaxEditorialSplit } from "./hero-parallax-editorial-split";
import { HeroSplitDualCtaFramedProduct } from "./hero-split-dual-cta-framed-product";
import { HeroSplitImageShowcase } from "./hero-split-image-showcase";
import { HeroSplitProductScreenshot } from "./hero-split-product-screenshot";
import { HeroSubscriptionSelector } from "./hero-subscription-selector";
import { HeroWithAnalyticsDashboard } from "./hero-with-analytics-dashboard";
import { HospitalityTierSelector } from "./hospitality-tier-selector";
import { IntegrationsTrustCta } from "./integrations-trust-cta";
import { InteractiveAsymmetricFeaturesBento } from "./interactive-asymmetric-features-bento";
import { IntroAsymmetricGallery } from "./intro-asymmetric-gallery";
import { ItemListRowMetadata } from "./item-list-row-metadata";
import { KpiCardsGridTrendBadgesActivity } from "./kpi-cards-grid-trend-badges-activity";
import { LogoCloudBentoAsymmetricFeatured } from "./logo-cloud-bento-asymmetric-featured";
import { LogoCloudBentoFeaturedPartner } from "./logo-cloud-bento-featured-partner";
import { LogoCloudFooterResponsiveStrip } from "./logo-cloud-footer-responsive-strip";
import { LogoCloudGridColorizeTooltip } from "./logo-cloud-grid-colorize-tooltip";
import { LogoCloudMarqueeInfiniteWordmarks } from "./logo-cloud-marquee-infinite-wordmarks";
import { LogoCloudSplitEditorial } from "./logo-cloud-split-editorial";
import { LogoGalleryFeaturedThumbnailRail } from "./logo-gallery-featured-thumbnail-rail";
import { MasonryOffsetFramed } from "./masonry-offset-framed";
import { MenuCategorySections } from "./menu-category-sections";
import { MenuFeaturesMatrix } from "./menu-features-matrix";
import { MenuPlatedItemCard } from "./menu-plated-item-card";
import { MetricsCardsWithDirectionalDeltas } from "./metrics-cards-with-directional-deltas";
import { MetricsCountupDeltaQuadAnimated } from "./metrics-countup-delta-quad-animated";
import { MissionValuesGrid } from "./mission-values-grid";
import { NarrativeStaggeredPhotos } from "./narrative-staggered-photos";
import { NewsChangelogTabbedTypeFilter } from "./news-changelog-tabbed-type-filter";
import { NewsReleaseLogSidebar } from "./news-release-log-sidebar";
import { OrganizationContactCard } from "./organization-contact-card";
import { OrganizationProfileCardMembers } from "./organization-profile-card-members";
import { OrganizationProfileStatsAvatarsCard } from "./organization-profile-stats-avatars-card";
import { PackageComparisonMatrix } from "./package-comparison-matrix";
import { PartnerDevelopersGrid } from "./partner-developers-grid";
import { PartnerLogosBand } from "./partner-logos-band";
import { PartnersGridCardLogo } from "./partners-grid-card-logo";
import { PartnersLogoCloudFourColumnIconCard } from "./partners-logo-cloud-four-column-icon-card";
import { PortfolioGrid3ColumnWithMetadata } from "./portfolio-grid-3column-with-metadata";
import { PortfolioGridShowcase } from "./portfolio-grid-showcase";
import { PricingAccordionExpandibleVertical } from "./pricing-accordion-expandible-vertical";
import { PricingAccordionTierExpandable } from "./pricing-accordion-tier-expandable";
import { PricingCardsThreeColumnHighlighted } from "./pricing-cards-three-column-highlighted";
import { PricingCarouselScrollSnapFilmstrip } from "./pricing-carousel-scroll-snap-filmstrip";
import { PricingDuoTierSplitFilledPlain } from "./pricing-duo-tier-split-filled-plain";
import { PricingInlineSingleRowBand } from "./pricing-inline-single-row-band";
import { PricingLedgerComparison } from "./pricing-ledger-comparison";
import { PricingSeatCalculatorSliderDynamic } from "./pricing-seat-calculator-slider-dynamic";
import { PricingSplitTiersFilledPlain } from "./pricing-split-tiers-filled-plain";
import { PricingTableLedgerComparisonHairline } from "./pricing-table-ledger-comparison-hairline";
import { PricingTableLedgerFeatureRows } from "./pricing-table-ledger-feature-rows";
import { PricingThreeToggleBillingCycle } from "./pricing-three-toggle-billing-cycle";
import { ProcessColorAnimatedSteps } from "./process-color-animated-steps";
import { ProcessFlowStateHeader } from "./process-flow-state-header";
import { ProcessHorizontalInteractiveClickableProgress } from "./process-horizontal-interactive-clickable-progress";
import { ProcessHorizontalNumberedRow } from "./process-horizontal-numbered-row";
import { ProcessMilestoneTimelineVerticalBadges } from "./process-milestone-timeline-vertical-badges";
import { ProcessPhasesStatusTimeline } from "./process-phases-status-timeline";
import { ProcessSidebarRailSteps } from "./process-sidebar-rail-steps";
import { ProcessStepperHorizontalInteractiveProgress } from "./process-stepper-horizontal-interactive-progress";
import { ProcessStepsHorizontalNumberedTrio } from "./process-steps-horizontal-numbered-trio";
import { ProcessStepsVerticalRailQuartet } from "./process-steps-vertical-rail-quartet";
import { ProcessStickyImageSteps } from "./process-sticky-image-steps";
import { ProcessTimelineWithStats } from "./process-timeline-with-stats";
import { ProcessVerticalNumberedRailSteps } from "./process-vertical-numbered-rail-steps";
import { ProcessVisualJourneySteps } from "./process-visual-journey-steps";
import { ProductBentoSixCellAnimated } from "./product-bento-six-cell-animated";
import { ProductCardInteractive } from "./product-card-interactive";
import { ProductCategoriesAnimated } from "./product-categories-animated";
import { ProductGridFeatured } from "./product-grid-featured";
import { ProductShowcaseFramedThumbnailRail } from "./product-showcase-framed-thumbnail-rail";
import { ProductSpotlightThumbnailRail } from "./product-spotlight-thumbnail-rail";
import { ProductUpdateCenteredCta } from "./product-update-centered-cta";
import { ProjectListWithImage } from "./project-list-with-image";
import { PropertyShowcaseDetailed } from "./property-showcase-detailed";
import { PropertyTiersPricingCardsHighlighted } from "./property-tiers-pricing-cards-highlighted";
import { PublicRoadmapVoteableFeatures } from "./public-roadmap-voteable-features";
import { QuoteCarouselWithSelectorChips } from "./quote-carousel-with-selector-chips";
import { ReviewsCarouselSelectorChipsBlurRotate } from "./reviews-carousel-selector-chips-blur-rotate";
import { ReviewsCarouselWithImages } from "./reviews-carousel-with-images";
import { ReviewsLedgerFeaturedMonogramGrid } from "./reviews-ledger-featured-monogram-grid";
import { ReviewsListDenseRowAvatarStarsHover } from "./reviews-list-dense-row-avatar-stars-hover";
import { ReviewsListWithRatingSummary } from "./reviews-list-with-rating-summary";
import { ReviewsMasonryVariedHeightWallOrganic } from "./reviews-masonry-varied-height-wall-organic";
import { RolePostingApplyCta } from "./role-posting-apply-cta";
import { SaasMarketingFullPage } from "./saas-marketing-full-page";
import { ServiceCatalogPriced } from "./service-catalog-priced";
import { ServiceDirectoryFilterable } from "./service-directory-filterable";
import { ServicesLinkGridSplit } from "./services-link-grid-split";
import { ServicesMasonry } from "./services-masonry";
import { SolutionsStatsShowcase } from "./solutions-stats-showcase";
import { SpecialtiesGrid } from "./specialties-grid";
import { StartupLandingWithKeyStats } from "./startup-landing-with-key-stats";
import { StatsBentoNarrative } from "./stats-bento-narrative";
import { StatsMetricCards } from "./stats-metric-cards";
import { StatusServicesUptimeMetricsList } from "./status-services-uptime-metrics-list";
import { TastingMenuPricingTiers } from "./tasting-menu-pricing-tiers";
import { TeamGridHoverReveal } from "./team-grid-hover-reveal";
import { TeamLineupCenteredPortrait } from "./team-lineup-centered-portrait";
import { TeamMemberCardCompactRow } from "./team-member-card-compact-row";
import { TeamMemberProfileIndividualCover } from "./team-member-profile-individual-cover";
import { TeamMembersGridBasic } from "./team-members-grid-basic";
import { TeamOrgCultureAlumni } from "./team-org-culture-alumni";
import { TeamPortraitsFullbleed } from "./team-portraits-fullbleed";
import { TeamPortraitsGridHoverDetails } from "./team-portraits-grid-hover-details";
import { TeamRowPortraitShowcase } from "./team-row-portrait-showcase";
import { TeamSeatCalculator } from "./team-seat-calculator";
import { TestimonialAndCaseStudyGrid } from "./testimonial-and-case-study-grid";
import { TestimonialFeaturedCenteredQuote } from "./testimonial-featured-centered-quote";
import { TestimonialOversizedQuoteAvatarLogo } from "./testimonial-oversized-quote-avatar-logo";
import { TestimonialSpotlightCentered } from "./testimonial-spotlight-centered";
import { TestimonialsCardsAnimatedBlurGrid } from "./testimonials-cards-animated-blur-grid";
import { TestimonialsCarouselFramedSelectorChips } from "./testimonials-carousel-framed-selector-chips";
import { TestimonialsDenseRatingRows } from "./testimonials-dense-rating-rows";
import { TestimonialsLedgerFeaturedPullQuote } from "./testimonials-ledger-featured-pull-quote";
import { TestimonialsMasonryVariedHeight } from "./testimonials-masonry-varied-height";
import { TestimonialsMasonryVariedHeights } from "./testimonials-masonry-varied-heights";
import { TestimonialsRowsBorderedHoverWash } from "./testimonials-rows-bordered-hover-wash";
import { TieredPlanCardsWithToggle } from "./tiered-plan-cards-with-toggle";
import { TimelineMilestoneBilateralAlternatingSpine } from "./timeline-milestone-bilateral-alternating-spine";
import { TimelineMilestoneLeftRailVertical } from "./timeline-milestone-left-rail-vertical";
import { TreatmentProcedureStepsVertical } from "./treatment-procedure-steps-vertical";

/**
 * BIBLIOTECA DE BLOQUES — motor, NO se edita a mano. Arquetipos DISTINTOS que el
 * agente COMPONE eligiendo del catálogo (catalog.md) + copy en es.json. Declarar
 * como { id: "block", block: "<key>", ns }. Regenerado por scripts/assemble-reference.mjs.
 */
export const blockSections: Record<string, ComponentType<{ ns: string }>> = {
  "about-mission-centered-with-metric-underline": AboutMissionCenteredWithMetricUnderline,
  "about-mission-statement-metrics-strip": AboutMissionStatementMetricsStrip,
  "about-narrative-team-photo-metrics": AboutNarrativeTeamPhotoMetrics,
  "about-narrative-with-metrics-row": AboutNarrativeWithMetricsRow,
  "accordion-faq-single-column": AccordionFaqSingleColumn,
  "agent-contact-form-map-locations": AgentContactFormMapLocations,
  "analytics-chart-with-kpi-summary": AnalyticsChartWithKpiSummary,
  "analytics-kpi-chart-with-trends": AnalyticsKpiChartWithTrends,
  "announcement-centered-with-cta": AnnouncementCenteredWithCta,
  "architectural-projects-grid": ArchitecturalProjectsGrid,
  "article-documentation-with-pagination": ArticleDocumentationWithPagination,
  "article-footer-social-share-tags": ArticleFooterSocialShareTags,
  "benefits-incentives-carousel": BenefitsIncentivesCarousel,
  "blog-article-centered-author-share": BlogArticleCenteredAuthorShare,
  "blog-guide-sticky-toc-navigation": BlogGuideStickyTocNavigation,
  "bordered-conversion-panel-split": BorderedConversionPanelSplit,
  "brand-partners-grid": BrandPartnersGrid,
  "call-booking-closure": CallBookingClosure,
  "case-study-immersive": CaseStudyImmersive,
  "changelog-versioned-grouped-rail": ChangelogVersionedGroupedRail,
  "clinic-metrics-animated-band": ClinicMetricsAnimatedBand,
  "company-history-alternating-spine": CompanyHistoryAlternatingSpine,
  "company-mission-intro-with-metrics": CompanyMissionIntroWithMetrics,
  "comparison-bilateral-conversion-cta": ComparisonBilateralConversionCta,
  "comparison-plans-table-sticky-header": ComparisonPlansTableStickyHeader,
  "comparison-table-3-plan-matrix": ComparisonTable3PlanMatrix,
  "comparison-us-vs-them-check-cross-duality": ComparisonUsVsThemCheckCrossDuality,
  "competitive-advantage-comparison": CompetitiveAdvantageComparison,
  "contact-channel-cards-hover-grid": ContactChannelCardsHoverGrid,
  "contact-channel-list-split-form": ContactChannelListSplitForm,
  "contact-form-centered-card": ContactFormCenteredCard,
  "contact-form-parallax-support": ContactFormParallaxSupport,
  "contact-form-topic-pills": ContactFormTopicPills,
  "contact-image-floating-card": ContactImageFloatingCard,
  "contact-locations-map-form": ContactLocationsMapForm,
  "contact-single-card-form-privacy": ContactSingleCardFormPrivacy,
  "culinary-staff-showcase": CulinaryStaffShowcase,
  "department-based-jobs-listing": DepartmentBasedJobsListing,
  "dining-categories-visual-grid": DiningCategoriesVisualGrid,
  "email-capture-band-horizontal": EmailCaptureBandHorizontal,
  "email-capture-closing": EmailCaptureClosing,
  "empty-state-dual-action-centered": EmptyStateDualActionCentered,
  "exhibition-framed-metadata": ExhibitionFramedMetadata,
  "expandable-pricing-features": ExpandablePricingFeatures,
  "faq-accordion-minimal-text-only": FaqAccordionMinimalTextOnly,
  "faq-accordion-sticky-support-sidebar": FaqAccordionStickySupportSidebar,
  "faq-accordion-tinted-background": FaqAccordionTintedBackground,
  "faq-accordion-two-column-balanced": FaqAccordionTwoColumnBalanced,
  "faq-accordion-two-column-bordered": FaqAccordionTwoColumnBordered,
  "faq-editorial-sidebar-sync": FaqEditorialSidebarSync,
  "faq-grid-cards-expandable": FaqGridCardsExpandable,
  "faq-list-icon-divider": FaqListIconDivider,
  "faq-support-cta-hybrid": FaqSupportCtaHybrid,
  "faq-tabbed-searchable-categories": FaqTabbedSearchableCategories,
  "faq-tabs-live-search": FaqTabsLiveSearch,
  "feature-alternating-split-image": FeatureAlternatingSplitImage,
  "feature-asymmetric-bento-motion-focus": FeatureAsymmetricBentoMotionFocus,
  "feature-cards-animated-scroll": FeatureCardsAnimatedScroll,
  "feature-cards-image-grid": FeatureCardsImageGrid,
  "feature-carousel-slides": FeatureCarouselSlides,
  "feature-dense-checklist-two-column": FeatureDenseChecklistTwoColumn,
  "feature-icon-grid-capabilities": FeatureIconGridCapabilities,
  "feature-interactive-grid-auto-cycle-pulse": FeatureInteractiveGridAutoCyclePulse,
  "feature-sticky-scroll-stack-offset-animation": FeatureStickyScrollStackOffsetAnimation,
  "feature-tabbed-grid-category-swap": FeatureTabbedGridCategorySwap,
  "features-alternating-dense-copy-image": FeaturesAlternatingDenseCopyImage,
  "features-alternating-split-bullet-narrative": FeaturesAlternatingSplitBulletNarrative,
  "features-dense-checkbox-list": FeaturesDenseCheckboxList,
  "features-tabbed-icon-grid": FeaturesTabbedIconGrid,
  "footer-asymmetric-split": FooterAsymmetricSplit,
  "footer-compact-inline-bar": FooterCompactInlineBar,
  "footer-compact-inline-row": FooterCompactInlineRow,
  "footer-diagonal-stripe": FooterDiagonalStripe,
  "footer-giant-wordmark-statement-close": FooterGiantWordmarkStatementClose,
  "footer-grid-blueprint-bordered": FooterGridBlueprintBordered,
  "footer-grid-bordered-cells-newsletter": FooterGridBorderedCellsNewsletter,
  "footer-grid-newsletter-themed": FooterGridNewsletterThemed,
  "footer-mega-localized": FooterMegaLocalized,
  "footer-mega-multicolumn-locale-theme": FooterMegaMulticolumnLocaleTheme,
  "footer-multi-column-sitemap-locale-theme": FooterMultiColumnSitemapLocaleTheme,
  "footer-vertical-dividers-split": FooterVerticalDividersSplit,
  "footer-wordmark-prominent-outline": FooterWordmarkProminentOutline,
  "full-width-conversion-banner": FullWidthConversionBanner,
  "gallery-bento-hero-supporting-tiles": GalleryBentoHeroSupportingTiles,
  "gallery-editorial-grayscale-indexed": GalleryEditorialGrayscaleIndexed,
  "gallery-filterable-portfolio": GalleryFilterablePortfolio,
  "gallery-grid-metrics-column": GalleryGridMetricsColumn,
  "gallery-grid-responsive-uniform": GalleryGridResponsiveUniform,
  "gallery-grid-uniform-responsive": GalleryGridUniformResponsive,
  "gallery-grid-with-stats-column": GalleryGridWithStatsColumn,
  "gallery-hover-reveal-portfolio": GalleryHoverRevealPortfolio,
  "gallery-marquee-infinite-edge-mask": GalleryMarqueeInfiniteEdgeMask,
  "gallery-masonry-caption-hover": GalleryMasonryCaptionHover,
  "gallery-masonry-css-columns-overlay": GalleryMasonryCssColumnsOverlay,
  "gallery-masonry-hover-overlay": GalleryMasonryHoverOverlay,
  "gallery-masonry-offset-variable-reveal": GalleryMasonryOffsetVariableReveal,
  "gallery-masonry-overlay-cards": GalleryMasonryOverlayCards,
  "gallery-motion-grid-four-tile-hover": GalleryMotionGridFourTileHover,
  "gallery-offset-masonry-varied-heights": GalleryOffsetMasonryVariedHeights,
  "gallery-spotlight-carousel-crossfade": GallerySpotlightCarouselCrossfade,
  "gallery-spotlight-carousel-thumbrail": GallerySpotlightCarouselThumbrail,
  "gallery-wall-4tile-motion-hover": GalleryWall4tileMotionHover,
  "gallery-wall-hover-reveal": GalleryWallHoverReveal,
  "header-centered-underline-hover": HeaderCenteredUnderlineHover,
  "header-editorial-wordmark-slashes": HeaderEditorialWordmarkSlashes,
  "header-flat-monochrome-drawer": HeaderFlatMonochromeDrawer,
  "header-full-width-marketing-cta": HeaderFullWidthMarketingCta,
  "header-full-width-responsive": HeaderFullWidthResponsive,
  "header-split-asymmetric-auth-cluster": HeaderSplitAsymmetricAuthCluster,
  "header-split-auth": HeaderSplitAuth,
  "header-split-auth-cluster": HeaderSplitAuthCluster,
  "header-sticky-blurred-navigation": HeaderStickyBlurredNavigation,
  "header-sticky-scroll-morphing-blur": HeaderStickyScrollMorphingBlur,
  "hero-conversion-landing-complete": HeroConversionLandingComplete,
  "hero-customer-success-story": HeroCustomerSuccessStory,
  "hero-editorial-with-stat-hairline": HeroEditorialWithStatHairline,
  "hero-email-waitlist-stats-flow": HeroEmailWaitlistStatsFlow,
  "hero-image-carousel": HeroImageCarousel,
  "hero-minimalist-statement": HeroMinimalistStatement,
  "hero-mobile-app-showcase": HeroMobileAppShowcase,
  "hero-parallax-editorial-split": HeroParallaxEditorialSplit,
  "hero-split-dual-cta-framed-product": HeroSplitDualCtaFramedProduct,
  "hero-split-image-showcase": HeroSplitImageShowcase,
  "hero-split-product-screenshot": HeroSplitProductScreenshot,
  "hero-subscription-selector": HeroSubscriptionSelector,
  "hero-with-analytics-dashboard": HeroWithAnalyticsDashboard,
  "hospitality-tier-selector": HospitalityTierSelector,
  "integrations-trust-cta": IntegrationsTrustCta,
  "interactive-asymmetric-features-bento": InteractiveAsymmetricFeaturesBento,
  "intro-asymmetric-gallery": IntroAsymmetricGallery,
  "item-list-row-metadata": ItemListRowMetadata,
  "kpi-cards-grid-trend-badges-activity": KpiCardsGridTrendBadgesActivity,
  "logo-cloud-bento-asymmetric-featured": LogoCloudBentoAsymmetricFeatured,
  "logo-cloud-bento-featured-partner": LogoCloudBentoFeaturedPartner,
  "logo-cloud-footer-responsive-strip": LogoCloudFooterResponsiveStrip,
  "logo-cloud-grid-colorize-tooltip": LogoCloudGridColorizeTooltip,
  "logo-cloud-marquee-infinite-wordmarks": LogoCloudMarqueeInfiniteWordmarks,
  "logo-cloud-split-editorial": LogoCloudSplitEditorial,
  "logo-gallery-featured-thumbnail-rail": LogoGalleryFeaturedThumbnailRail,
  "masonry-offset-framed": MasonryOffsetFramed,
  "menu-category-sections": MenuCategorySections,
  "menu-features-matrix": MenuFeaturesMatrix,
  "menu-plated-item-card": MenuPlatedItemCard,
  "metrics-cards-with-directional-deltas": MetricsCardsWithDirectionalDeltas,
  "metrics-countup-delta-quad-animated": MetricsCountupDeltaQuadAnimated,
  "mission-values-grid": MissionValuesGrid,
  "narrative-staggered-photos": NarrativeStaggeredPhotos,
  "news-changelog-tabbed-type-filter": NewsChangelogTabbedTypeFilter,
  "news-release-log-sidebar": NewsReleaseLogSidebar,
  "organization-contact-card": OrganizationContactCard,
  "organization-profile-card-members": OrganizationProfileCardMembers,
  "organization-profile-stats-avatars-card": OrganizationProfileStatsAvatarsCard,
  "package-comparison-matrix": PackageComparisonMatrix,
  "partner-developers-grid": PartnerDevelopersGrid,
  "partner-logos-band": PartnerLogosBand,
  "partners-grid-card-logo": PartnersGridCardLogo,
  "partners-logo-cloud-four-column-icon-card": PartnersLogoCloudFourColumnIconCard,
  "portfolio-grid-3column-with-metadata": PortfolioGrid3ColumnWithMetadata,
  "portfolio-grid-showcase": PortfolioGridShowcase,
  "pricing-accordion-expandible-vertical": PricingAccordionExpandibleVertical,
  "pricing-accordion-tier-expandable": PricingAccordionTierExpandable,
  "pricing-cards-three-column-highlighted": PricingCardsThreeColumnHighlighted,
  "pricing-carousel-scroll-snap-filmstrip": PricingCarouselScrollSnapFilmstrip,
  "pricing-duo-tier-split-filled-plain": PricingDuoTierSplitFilledPlain,
  "pricing-inline-single-row-band": PricingInlineSingleRowBand,
  "pricing-ledger-comparison": PricingLedgerComparison,
  "pricing-seat-calculator-slider-dynamic": PricingSeatCalculatorSliderDynamic,
  "pricing-split-tiers-filled-plain": PricingSplitTiersFilledPlain,
  "pricing-table-ledger-comparison-hairline": PricingTableLedgerComparisonHairline,
  "pricing-table-ledger-feature-rows": PricingTableLedgerFeatureRows,
  "pricing-three-toggle-billing-cycle": PricingThreeToggleBillingCycle,
  "process-color-animated-steps": ProcessColorAnimatedSteps,
  "process-flow-state-header": ProcessFlowStateHeader,
  "process-horizontal-interactive-clickable-progress": ProcessHorizontalInteractiveClickableProgress,
  "process-horizontal-numbered-row": ProcessHorizontalNumberedRow,
  "process-milestone-timeline-vertical-badges": ProcessMilestoneTimelineVerticalBadges,
  "process-phases-status-timeline": ProcessPhasesStatusTimeline,
  "process-sidebar-rail-steps": ProcessSidebarRailSteps,
  "process-stepper-horizontal-interactive-progress": ProcessStepperHorizontalInteractiveProgress,
  "process-steps-horizontal-numbered-trio": ProcessStepsHorizontalNumberedTrio,
  "process-steps-vertical-rail-quartet": ProcessStepsVerticalRailQuartet,
  "process-sticky-image-steps": ProcessStickyImageSteps,
  "process-timeline-with-stats": ProcessTimelineWithStats,
  "process-vertical-numbered-rail-steps": ProcessVerticalNumberedRailSteps,
  "process-visual-journey-steps": ProcessVisualJourneySteps,
  "product-bento-six-cell-animated": ProductBentoSixCellAnimated,
  "product-card-interactive": ProductCardInteractive,
  "product-categories-animated": ProductCategoriesAnimated,
  "product-grid-featured": ProductGridFeatured,
  "product-showcase-framed-thumbnail-rail": ProductShowcaseFramedThumbnailRail,
  "product-spotlight-thumbnail-rail": ProductSpotlightThumbnailRail,
  "product-update-centered-cta": ProductUpdateCenteredCta,
  "project-list-with-image": ProjectListWithImage,
  "property-showcase-detailed": PropertyShowcaseDetailed,
  "property-tiers-pricing-cards-highlighted": PropertyTiersPricingCardsHighlighted,
  "public-roadmap-voteable-features": PublicRoadmapVoteableFeatures,
  "quote-carousel-with-selector-chips": QuoteCarouselWithSelectorChips,
  "reviews-carousel-selector-chips-blur-rotate": ReviewsCarouselSelectorChipsBlurRotate,
  "reviews-carousel-with-images": ReviewsCarouselWithImages,
  "reviews-ledger-featured-monogram-grid": ReviewsLedgerFeaturedMonogramGrid,
  "reviews-list-dense-row-avatar-stars-hover": ReviewsListDenseRowAvatarStarsHover,
  "reviews-list-with-rating-summary": ReviewsListWithRatingSummary,
  "reviews-masonry-varied-height-wall-organic": ReviewsMasonryVariedHeightWallOrganic,
  "role-posting-apply-cta": RolePostingApplyCta,
  "saas-marketing-full-page": SaasMarketingFullPage,
  "service-catalog-priced": ServiceCatalogPriced,
  "service-directory-filterable": ServiceDirectoryFilterable,
  "services-link-grid-split": ServicesLinkGridSplit,
  "services-masonry": ServicesMasonry,
  "solutions-stats-showcase": SolutionsStatsShowcase,
  "specialties-grid": SpecialtiesGrid,
  "startup-landing-with-key-stats": StartupLandingWithKeyStats,
  "stats-bento-narrative": StatsBentoNarrative,
  "stats-metric-cards": StatsMetricCards,
  "status-services-uptime-metrics-list": StatusServicesUptimeMetricsList,
  "tasting-menu-pricing-tiers": TastingMenuPricingTiers,
  "team-grid-hover-reveal": TeamGridHoverReveal,
  "team-lineup-centered-portrait": TeamLineupCenteredPortrait,
  "team-member-card-compact-row": TeamMemberCardCompactRow,
  "team-member-profile-individual-cover": TeamMemberProfileIndividualCover,
  "team-members-grid-basic": TeamMembersGridBasic,
  "team-org-culture-alumni": TeamOrgCultureAlumni,
  "team-portraits-fullbleed": TeamPortraitsFullbleed,
  "team-portraits-grid-hover-details": TeamPortraitsGridHoverDetails,
  "team-row-portrait-showcase": TeamRowPortraitShowcase,
  "team-seat-calculator": TeamSeatCalculator,
  "testimonial-and-case-study-grid": TestimonialAndCaseStudyGrid,
  "testimonial-featured-centered-quote": TestimonialFeaturedCenteredQuote,
  "testimonial-oversized-quote-avatar-logo": TestimonialOversizedQuoteAvatarLogo,
  "testimonial-spotlight-centered": TestimonialSpotlightCentered,
  "testimonials-cards-animated-blur-grid": TestimonialsCardsAnimatedBlurGrid,
  "testimonials-carousel-framed-selector-chips": TestimonialsCarouselFramedSelectorChips,
  "testimonials-dense-rating-rows": TestimonialsDenseRatingRows,
  "testimonials-ledger-featured-pull-quote": TestimonialsLedgerFeaturedPullQuote,
  "testimonials-masonry-varied-height": TestimonialsMasonryVariedHeight,
  "testimonials-masonry-varied-heights": TestimonialsMasonryVariedHeights,
  "testimonials-rows-bordered-hover-wash": TestimonialsRowsBorderedHoverWash,
  "tiered-plan-cards-with-toggle": TieredPlanCardsWithToggle,
  "timeline-milestone-bilateral-alternating-spine": TimelineMilestoneBilateralAlternatingSpine,
  "timeline-milestone-left-rail-vertical": TimelineMilestoneLeftRailVertical,
  "treatment-procedure-steps-vertical": TreatmentProcedureStepsVertical,
};
