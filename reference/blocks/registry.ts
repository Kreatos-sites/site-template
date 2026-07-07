import type { ComponentType } from "react";

import { AboutMissionCenteredWithMetricUnderline } from "./about-mission-centered-with-metric-underline";
import { AboutMissionStatementMetricsStrip } from "./about-mission-statement-metrics-strip";
import { AboutNarrativeTeamPhotoMetrics } from "./about-narrative-team-photo-metrics";
import { AboutNarrativeWithMetricsRow } from "./about-narrative-with-metrics-row";
import { AboutOrganizationProfileStats } from "./about-organization-profile-stats";
import { AboutSectionCenteredEyebrowMissionMetrics } from "./about-section-centered-eyebrow-mission-metrics";
import { AboutValuesAlternatingFeatures } from "./about-values-alternating-features";
import { AccordionFaqSingleColumn } from "./accordion-faq-single-column";
import { AgentContactFormMapLocations } from "./agent-contact-form-map-locations";
import { AnalyticsChartWithKpiSummary } from "./analytics-chart-with-kpi-summary";
import { AnalyticsKpiChartWithTrends } from "./analytics-kpi-chart-with-trends";
import { AnnouncementCenteredWithCta } from "./announcement-centered-with-cta";
import { ArchitecturalProjectsGrid } from "./architectural-projects-grid";
import { ArticleDocumentationWithPagination } from "./article-documentation-with-pagination";
import { ArticleEditorialStickySidebarTocSync } from "./article-editorial-sticky-sidebar-toc-sync";
import { ArticleFooterSocialShareTags } from "./article-footer-social-share-tags";
import { BenefitsIncentivesCarousel } from "./benefits-incentives-carousel";
import { BlogArticleCenteredAuthorShare } from "./blog-article-centered-author-share";
import { BlogArticleDocsBreadcrumbMetaPagination } from "./blog-article-docs-breadcrumb-meta-pagination";
import { BlogArticleHeroAuthorTagsSocial } from "./blog-article-hero-author-tags-social";
import { BlogGuideStickyTocNavigation } from "./blog-guide-sticky-toc-navigation";
import { BorderedConversionPanelSplit } from "./bordered-conversion-panel-split";
import { BrandPartnersGrid } from "./brand-partners-grid";
import { CallBookingClosure } from "./call-booking-closure";
import { CaseStudyImmersive } from "./case-study-immersive";
import { ChangelogVersionedGroupedRail } from "./changelog-versioned-grouped-rail";
import { ClinicMetricsAnimatedBand } from "./clinic-metrics-animated-band";
import { CompanyHistoryAlternatingSpine } from "./company-history-alternating-spine";
import { CompanyJourneyTimelineVerticalRail } from "./company-journey-timeline-vertical-rail";
import { CompanyMissionIntroWithMetrics } from "./company-mission-intro-with-metrics";
import { ComparisonBilateralConversionCta } from "./comparison-bilateral-conversion-cta";
import { ComparisonBilateralUsThemCheckMarkCta } from "./comparison-bilateral-us-them-check-mark-cta";
import { ComparisonPlansTableStickyHeader } from "./comparison-plans-table-sticky-header";
import { ComparisonTable3PlanMatrix } from "./comparison-table-3-plan-matrix";
import { ComparisonUsVsThemCheckCrossDuality } from "./comparison-us-vs-them-check-cross-duality";
import { CompetitiveAdvantageComparison } from "./competitive-advantage-comparison";
import { ContactChannelCardsHoverGrid } from "./contact-channel-cards-hover-grid";
import { ContactChannelCardsMiniFormGrid } from "./contact-channel-cards-mini-form-grid";
import { ContactChannelListSplitForm } from "./contact-channel-list-split-form";
import { ContactChannelsListFormSplitReveal } from "./contact-channels-list-form-split-reveal";
import { ContactFormCenteredCard } from "./contact-form-centered-card";
import { ContactFormMapOfficeLocations } from "./contact-form-map-office-locations";
import { ContactFormParallaxSupport } from "./contact-form-parallax-support";
import { ContactFormParallaxSupportVisual } from "./contact-form-parallax-support-visual";
import { ContactFormTopicPills } from "./contact-form-topic-pills";
import { ContactImageFloatingCard } from "./contact-image-floating-card";
import { ContactLocationsMapForm } from "./contact-locations-map-form";
import { ContactSingleCardFormPrivacy } from "./contact-single-card-form-privacy";
import { CtaBandHorizontalBlurConversion } from "./cta-band-horizontal-blur-conversion";
import { CulinaryStaffShowcase } from "./culinary-staff-showcase";
import { DepartmentBasedJobsListing } from "./department-based-jobs-listing";
import { DiningCategoriesVisualGrid } from "./dining-categories-visual-grid";
import { EmailCaptureBandHorizontal } from "./email-capture-band-horizontal";
import { EmailCaptureClosing } from "./email-capture-closing";
import { EmailSubscriptionBandInlineForm } from "./email-subscription-band-inline-form";
import { EmptyStateDualActionCentered } from "./empty-state-dual-action-centered";
import { ExhibitionFramedMetadata } from "./exhibition-framed-metadata";
import { ExpandablePricingFeatures } from "./expandable-pricing-features";
import { FaqAccordionContactCardAlongside } from "./faq-accordion-contact-card-alongside";
import { FaqAccordionMinimalTextOnly } from "./faq-accordion-minimal-text-only";
import { FaqAccordionSplitFramedPaper } from "./faq-accordion-split-framed-paper";
import { FaqAccordionStickySupportSidebar } from "./faq-accordion-sticky-support-sidebar";
import { FaqAccordionTintedBackground } from "./faq-accordion-tinted-background";
import { FaqAccordionTwoColumnBalanced } from "./faq-accordion-two-column-balanced";
import { FaqAccordionTwoColumnBordered } from "./faq-accordion-two-column-bordered";
import { FaqEditorialSidebarSync } from "./faq-editorial-sidebar-sync";
import { FaqGridCardsExpandable } from "./faq-grid-cards-expandable";
import { FaqGridCardsHoverLift } from "./faq-grid-cards-hover-lift";
import { FaqListIconDivider } from "./faq-list-icon-divider";
import { FaqSidebarEditorialIndexedSticky } from "./faq-sidebar-editorial-indexed-sticky";
import { FaqSupportCtaHybrid } from "./faq-support-cta-hybrid";
import { FaqTabbedPillFilterCategories } from "./faq-tabbed-pill-filter-categories";
import { FaqTabbedSearchableCategories } from "./faq-tabbed-searchable-categories";
import { FaqTabsLiveSearch } from "./faq-tabs-live-search";
import { FeatureAlternatingSplitImage } from "./feature-alternating-split-image";
import { FeatureAsymmetricBentoMotionFocus } from "./feature-asymmetric-bento-motion-focus";
import { FeatureBentoAsymmetricExpandableMotion } from "./feature-bento-asymmetric-expandable-motion";
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
import { FeaturesChecklistDenseTwoColumnMarks } from "./features-checklist-dense-two-column-marks";
import { FeaturesDenseCheckboxList } from "./features-dense-checkbox-list";
import { FeaturesTabbedIconGrid } from "./features-tabbed-icon-grid";
import { FooterAsymmetricSplit } from "./footer-asymmetric-split";
import { FooterBrandNavigationInline } from "./footer-brand-navigation-inline";
import { FooterColumnsBoxedSocialsPairedCta } from "./footer-columns-boxed-socials-paired-cta";
import { FooterCompactInlineBar } from "./footer-compact-inline-bar";
import { FooterCompactInlineRow } from "./footer-compact-inline-row";
import { FooterDiagonalStripe } from "./footer-diagonal-stripe";
import { FooterFourColumnMonochromeWordmarkMinimal } from "./footer-four-column-monochrome-wordmark-minimal";
import { FooterGiantWordmarkStatementClose } from "./footer-giant-wordmark-statement-close";
import { FooterGridBlueprintBordered } from "./footer-grid-blueprint-bordered";
import { FooterGridBorderedCellsNewsletter } from "./footer-grid-bordered-cells-newsletter";
import { FooterGridNewsletterThemed } from "./footer-grid-newsletter-themed";
import { FooterInlineBlurWordmarkCompact } from "./footer-inline-blur-wordmark-compact";
import { FooterMegaLocalized } from "./footer-mega-localized";
import { FooterMegaMulticolumnLocaleTheme } from "./footer-mega-multicolumn-locale-theme";
import { FooterMegaSitemapLocaleThemeBar } from "./footer-mega-sitemap-locale-theme-bar";
import { FooterMultiColumnSitemapLocaleTheme } from "./footer-multi-column-sitemap-locale-theme";
import { FooterNewsletterGroupedColumnsSocial } from "./footer-newsletter-grouped-columns-social";
import { FooterVerticalDividersSplit } from "./footer-vertical-dividers-split";
import { FooterWordmarkProminentOutline } from "./footer-wordmark-prominent-outline";
import { FullWidthConversionBanner } from "./full-width-conversion-banner";
import { GalleryBentoHeroSupportingTiles } from "./gallery-bento-hero-supporting-tiles";
import { GalleryEditorialGrayscaleIndexed } from "./gallery-editorial-grayscale-indexed";
import { GalleryExhibitionDecorFramedCrossfade } from "./gallery-exhibition-decor-framed-crossfade";
import { GalleryFilterablePortfolio } from "./gallery-filterable-portfolio";
import { GalleryGridMetricsColumn } from "./gallery-grid-metrics-column";
import { GalleryGridResponsiveUniform } from "./gallery-grid-responsive-uniform";
import { GalleryGridUniformResponsive } from "./gallery-grid-uniform-responsive";
import { GalleryGridWithStatsColumn } from "./gallery-grid-with-stats-column";
import { GalleryHoverRevealPortfolio } from "./gallery-hover-reveal-portfolio";
import { GalleryMarqueeInfiniteEdgeMask } from "./gallery-marquee-infinite-edge-mask";
import { GalleryMarqueeInfiniteEdgeMask2 } from "./gallery-marquee-infinite-edge-mask-2";
import { GalleryMasonryCaptionHover } from "./gallery-masonry-caption-hover";
import { GalleryMasonryCssColumnsOverlay } from "./gallery-masonry-css-columns-overlay";
import { GalleryMasonryCssColumnsOverlay2 } from "./gallery-masonry-css-columns-overlay-2";
import { GalleryMasonryHoverOverlay } from "./gallery-masonry-hover-overlay";
import { GalleryMasonryOffsetVariableReveal } from "./gallery-masonry-offset-variable-reveal";
import { GalleryMasonryOffsetVariableReveal2 } from "./gallery-masonry-offset-variable-reveal-2";
import { GalleryMasonryOverlayCards } from "./gallery-masonry-overlay-cards";
import { GalleryMotionGridFourTileHover } from "./gallery-motion-grid-four-tile-hover";
import { GalleryOffsetMasonryVariedHeights } from "./gallery-offset-masonry-varied-heights";
import { GallerySpotlightCarouselCrossfade } from "./gallery-spotlight-carousel-crossfade";
import { GallerySpotlightCarouselThumbrail } from "./gallery-spotlight-carousel-thumbrail";
import { GallerySpotlightCarouselThumbrail2 } from "./gallery-spotlight-carousel-thumbrail-2";
import { GalleryWall4tileMotionHover } from "./gallery-wall-4tile-motion-hover";
import { GalleryWall4tileMotionHover2 } from "./gallery-wall-4tile-motion-hover-2";
import { GalleryWallHoverReveal } from "./gallery-wall-hover-reveal";
import { HeaderCenteredUnderlineHover } from "./header-centered-underline-hover";
import { HeaderDropdownMegamenuReveal } from "./header-dropdown-megamenu-reveal";
import { HeaderEditorialWordmarkSlashes } from "./header-editorial-wordmark-slashes";
import { HeaderFlatMonochromeDrawer } from "./header-flat-monochrome-drawer";
import { HeaderFullWidthMarketingCta } from "./header-full-width-marketing-cta";
import { HeaderFullWidthResponsive } from "./header-full-width-responsive";
import { HeaderSearchExpandableUtilities } from "./header-search-expandable-utilities";
import { HeaderSplitAsymmetricAuthCluster } from "./header-split-asymmetric-auth-cluster";
import { HeaderSplitAuth } from "./header-split-auth";
import { HeaderSplitAuthCluster } from "./header-split-auth-cluster";
import { HeaderStickyBlurredNavigation } from "./header-sticky-blurred-navigation";
import { HeaderStickyMorphingScrollAnimation } from "./header-sticky-morphing-scroll-animation";
import { HeaderStickyScrollMorphingBlur } from "./header-sticky-scroll-morphing-blur";
import { HeaderWordmarkSlashDividerMinimal } from "./header-wordmark-slash-divider-minimal";
import { HeroConversionLandingComplete } from "./hero-conversion-landing-complete";
import { HeroCustomerSuccessStory } from "./hero-customer-success-story";
import { HeroEditorialWithStatHairline } from "./hero-editorial-with-stat-hairline";
import { HeroEmailWaitlistStatsFlow } from "./hero-email-waitlist-stats-flow";
import { HeroImageCarousel } from "./hero-image-carousel";
import { HeroLeftAlignedDualCtaMetricsInline } from "./hero-left-aligned-dual-cta-metrics-inline";
import { HeroMinimalistStatement } from "./hero-minimalist-statement";
import { HeroMobileAppShowcase } from "./hero-mobile-app-showcase";
import { HeroParallaxEditorialSplit } from "./hero-parallax-editorial-split";
import { HeroSplitDualCtaFramedProduct } from "./hero-split-dual-cta-framed-product";
import { HeroSplitImageShowcase } from "./hero-split-image-showcase";
import { HeroSplitProductScreenshot } from "./hero-split-product-screenshot";
import { HeroSplitScreenshotDualCtaSide } from "./hero-split-screenshot-dual-cta-side";
import { HeroSubscriptionSelector } from "./hero-subscription-selector";
import { HeroWithAnalyticsDashboard } from "./hero-with-analytics-dashboard";
import { HospitalityTierSelector } from "./hospitality-tier-selector";
import { IntegrationsDirectorySearchableFilterableGrid } from "./integrations-directory-searchable-filterable-grid";
import { IntegrationsTrustCta } from "./integrations-trust-cta";
import { InteractiveAsymmetricFeaturesBento } from "./interactive-asymmetric-features-bento";
import { IntroAsymmetricGallery } from "./intro-asymmetric-gallery";
import { ItemListRowMetadata } from "./item-list-row-metadata";
import { KpiCardsGridTrendBadgesActivity } from "./kpi-cards-grid-trend-badges-activity";
import { KpiTilesHorizontalGridWithDelta } from "./kpi-tiles-horizontal-grid-with-delta";
import { LandingSaasAssembledWithStatsBand } from "./landing-saas-assembled-with-stats-band";
import { LandingStartupWithKeyStatsSection } from "./landing-startup-with-key-stats-section";
import { LogoCloudBentoAsymmetricFeatured } from "./logo-cloud-bento-asymmetric-featured";
import { LogoCloudBentoFeaturedPartner } from "./logo-cloud-bento-featured-partner";
import { LogoCloudDualRowOppositeDrift } from "./logo-cloud-dual-row-opposite-drift";
import { LogoCloudFooterResponsiveStrip } from "./logo-cloud-footer-responsive-strip";
import { LogoCloudGridColorizeTooltip } from "./logo-cloud-grid-colorize-tooltip";
import { LogoCloudGridFourColumnCard } from "./logo-cloud-grid-four-column-card";
import { LogoCloudGridPulseFocusActive } from "./logo-cloud-grid-pulse-focus-active";
import { LogoCloudLedgerStaticBorderedWordmark } from "./logo-cloud-ledger-static-bordered-wordmark";
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
import { PortfolioBentoAsymmetricFeaturedPlusTwo } from "./portfolio-bento-asymmetric-featured-plus-two";
import { PortfolioGrid3ColumnWithMetadata } from "./portfolio-grid-3column-with-metadata";
import { PortfolioGridShowcase } from "./portfolio-grid-showcase";
import { PricingAccordionExpandibleVertical } from "./pricing-accordion-expandible-vertical";
import { PricingAccordionTierExpandable } from "./pricing-accordion-tier-expandable";
import { PricingCardsThreeColumnHighlighted } from "./pricing-cards-three-column-highlighted";
import { PricingCardsTieredStandardHighlightFeatured } from "./pricing-cards-tiered-standard-highlight-featured";
import { PricingCarouselScrollSnapFilmstrip } from "./pricing-carousel-scroll-snap-filmstrip";
import { PricingCarouselScrollSnapScaleActive } from "./pricing-carousel-scroll-snap-scale-active";
import { PricingDuoTierSplitFilledPlain } from "./pricing-duo-tier-split-filled-plain";
import { PricingInlineSingleRowBand } from "./pricing-inline-single-row-band";
import { PricingLedgerComparison } from "./pricing-ledger-comparison";
import { PricingSeatCalculatorSliderDynamic } from "./pricing-seat-calculator-slider-dynamic";
import { PricingSliderTeamSeatsAnimatedCalculator } from "./pricing-slider-team-seats-animated-calculator";
import { PricingSplitTiersFilledPlain } from "./pricing-split-tiers-filled-plain";
import { PricingTableLedgerComparisonHairline } from "./pricing-table-ledger-comparison-hairline";
import { PricingTableLedgerFeatureRows } from "./pricing-table-ledger-feature-rows";
import { PricingTableMatrixCompareFeatureSticky } from "./pricing-table-matrix-compare-feature-sticky";
import { PricingThreeToggleBillingCycle } from "./pricing-three-toggle-billing-cycle";
import { PricingTierCenteredSelectorToggleBilling } from "./pricing-tier-centered-selector-toggle-billing";
import { ProcessColorAnimatedSteps } from "./process-color-animated-steps";
import { ProcessFlowStateHeader } from "./process-flow-state-header";
import { ProcessHorizontalInteractiveClickableProgress } from "./process-horizontal-interactive-clickable-progress";
import { ProcessHorizontalNumberedRow } from "./process-horizontal-numbered-row";
import { ProcessHowItWorksHorizontalIconTrio } from "./process-how-it-works-horizontal-icon-trio";
import { ProcessHowItWorksVerticalBorderedRail } from "./process-how-it-works-vertical-bordered-rail";
import { ProcessMilestoneTimelineVerticalBadges } from "./process-milestone-timeline-vertical-badges";
import { ProcessPhasesStatusTimeline } from "./process-phases-status-timeline";
import { ProcessSidebarRailSteps } from "./process-sidebar-rail-steps";
import { ProcessStepperHorizontalInteractiveClickableResponsive } from "./process-stepper-horizontal-interactive-clickable-responsive";
import { ProcessStepperHorizontalInteractiveProgress } from "./process-stepper-horizontal-interactive-progress";
import { ProcessStepperHorizontalNumberedCompletedState } from "./process-stepper-horizontal-numbered-completed-state";
import { ProcessStepperVerticalRailWithDescriptions } from "./process-stepper-vertical-rail-with-descriptions";
import { ProcessStepsHorizontalNumberedTrio } from "./process-steps-horizontal-numbered-trio";
import { ProcessStepsVerticalRailQuartet } from "./process-steps-vertical-rail-quartet";
import { ProcessStickyImageSteps } from "./process-sticky-image-steps";
import { ProcessTimelineWithStats } from "./process-timeline-with-stats";
import { ProcessVerticalNumberedRailSteps } from "./process-vertical-numbered-rail-steps";
import { ProcessVisualJourneySteps } from "./process-visual-journey-steps";
import { ProductBentoSixCellAnimated } from "./product-bento-six-cell-animated";
import { ProductCardInteractive } from "./product-card-interactive";
import { ProductCategoriesAnimated } from "./product-categories-animated";
import { ProductChangelogVersionedGroupedRail } from "./product-changelog-versioned-grouped-rail";
import { ProductGalleryScreenshotFeaturedThumbstrip } from "./product-gallery-screenshot-featured-thumbstrip";
import { ProductGridFeatured } from "./product-grid-featured";
import { ProductIntegrationsGridIconLabelDense } from "./product-integrations-grid-icon-label-dense";
import { ProductPlanSpotlightSingleCenteredChecklist } from "./product-plan-spotlight-single-centered-checklist";
import { ProductPricingSplit2TierContrast } from "./product-pricing-split-2-tier-contrast";
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
import { RoadmapFeatureRequestsUpvoteInteractive } from "./roadmap-feature-requests-upvote-interactive";
import { RolePostingApplyCta } from "./role-posting-apply-cta";
import { SaasMarketingFullPage } from "./saas-marketing-full-page";
import { ServiceCatalogPriced } from "./service-catalog-priced";
import { ServiceDirectoryFilterable } from "./service-directory-filterable";
import { ServicesLinkGridSplit } from "./services-link-grid-split";
import { ServicesMasonry } from "./services-masonry";
import { SolutionsStatsShowcase } from "./solutions-stats-showcase";
import { SpecialtiesGrid } from "./specialties-grid";
import { StartupLandingWithKeyStats } from "./startup-landing-with-key-stats";
import { StatsBandMinimalFourColumn } from "./stats-band-minimal-four-column";
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
import { TestimonialFeaturedCenteredOversizedQuote } from "./testimonial-featured-centered-oversized-quote";
import { TestimonialFeaturedCenteredQuote } from "./testimonial-featured-centered-quote";
import { TestimonialOversizedQuoteAvatarLogo } from "./testimonial-oversized-quote-avatar-logo";
import { TestimonialSpotlightCentered } from "./testimonial-spotlight-centered";
import { TestimonialsCardsAnimatedBlurGrid } from "./testimonials-cards-animated-blur-grid";
import { TestimonialsCardsThreeColumnBlurStaggerRating } from "./testimonials-cards-three-column-blur-stagger-rating";
import { TestimonialsCarouselAutoCycleSelectorCrossfade } from "./testimonials-carousel-auto-cycle-selector-crossfade";
import { TestimonialsCarouselFramedSelectorChips } from "./testimonials-carousel-framed-selector-chips";
import { TestimonialsDenseRatingRows } from "./testimonials-dense-rating-rows";
import { TestimonialsLedgerFeaturedPullQuote } from "./testimonials-ledger-featured-pull-quote";
import { TestimonialsListDenseRowsAvatarRatingHover } from "./testimonials-list-dense-rows-avatar-rating-hover";
import { TestimonialsMasonryVariedHeight } from "./testimonials-masonry-varied-height";
import { TestimonialsMasonryVariedHeights } from "./testimonials-masonry-varied-heights";
import { TestimonialsMasonryWallVariedHeightsOrganic } from "./testimonials-masonry-wall-varied-heights-organic";
import { TestimonialsRowsBorderedHoverWash } from "./testimonials-rows-bordered-hover-wash";
import { TieredPlanCardsWithToggle } from "./tiered-plan-cards-with-toggle";
import { TimelineBilateralSpineCenteredMilestones } from "./timeline-bilateral-spine-centered-milestones";
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
  "about-organization-profile-stats": AboutOrganizationProfileStats,
  "about-section-centered-eyebrow-mission-metrics": AboutSectionCenteredEyebrowMissionMetrics,
  "about-values-alternating-features": AboutValuesAlternatingFeatures,
  "accordion-faq-single-column": AccordionFaqSingleColumn,
  "agent-contact-form-map-locations": AgentContactFormMapLocations,
  "analytics-chart-with-kpi-summary": AnalyticsChartWithKpiSummary,
  "analytics-kpi-chart-with-trends": AnalyticsKpiChartWithTrends,
  "announcement-centered-with-cta": AnnouncementCenteredWithCta,
  "architectural-projects-grid": ArchitecturalProjectsGrid,
  "article-documentation-with-pagination": ArticleDocumentationWithPagination,
  "article-editorial-sticky-sidebar-toc-sync": ArticleEditorialStickySidebarTocSync,
  "article-footer-social-share-tags": ArticleFooterSocialShareTags,
  "benefits-incentives-carousel": BenefitsIncentivesCarousel,
  "blog-article-centered-author-share": BlogArticleCenteredAuthorShare,
  "blog-article-docs-breadcrumb-meta-pagination": BlogArticleDocsBreadcrumbMetaPagination,
  "blog-article-hero-author-tags-social": BlogArticleHeroAuthorTagsSocial,
  "blog-guide-sticky-toc-navigation": BlogGuideStickyTocNavigation,
  "bordered-conversion-panel-split": BorderedConversionPanelSplit,
  "brand-partners-grid": BrandPartnersGrid,
  "call-booking-closure": CallBookingClosure,
  "case-study-immersive": CaseStudyImmersive,
  "changelog-versioned-grouped-rail": ChangelogVersionedGroupedRail,
  "clinic-metrics-animated-band": ClinicMetricsAnimatedBand,
  "company-history-alternating-spine": CompanyHistoryAlternatingSpine,
  "company-journey-timeline-vertical-rail": CompanyJourneyTimelineVerticalRail,
  "company-mission-intro-with-metrics": CompanyMissionIntroWithMetrics,
  "comparison-bilateral-conversion-cta": ComparisonBilateralConversionCta,
  "comparison-bilateral-us-them-check-mark-cta": ComparisonBilateralUsThemCheckMarkCta,
  "comparison-plans-table-sticky-header": ComparisonPlansTableStickyHeader,
  "comparison-table-3-plan-matrix": ComparisonTable3PlanMatrix,
  "comparison-us-vs-them-check-cross-duality": ComparisonUsVsThemCheckCrossDuality,
  "competitive-advantage-comparison": CompetitiveAdvantageComparison,
  "contact-channel-cards-hover-grid": ContactChannelCardsHoverGrid,
  "contact-channel-cards-mini-form-grid": ContactChannelCardsMiniFormGrid,
  "contact-channel-list-split-form": ContactChannelListSplitForm,
  "contact-channels-list-form-split-reveal": ContactChannelsListFormSplitReveal,
  "contact-form-centered-card": ContactFormCenteredCard,
  "contact-form-map-office-locations": ContactFormMapOfficeLocations,
  "contact-form-parallax-support": ContactFormParallaxSupport,
  "contact-form-parallax-support-visual": ContactFormParallaxSupportVisual,
  "contact-form-topic-pills": ContactFormTopicPills,
  "contact-image-floating-card": ContactImageFloatingCard,
  "contact-locations-map-form": ContactLocationsMapForm,
  "contact-single-card-form-privacy": ContactSingleCardFormPrivacy,
  "cta-band-horizontal-blur-conversion": CtaBandHorizontalBlurConversion,
  "culinary-staff-showcase": CulinaryStaffShowcase,
  "department-based-jobs-listing": DepartmentBasedJobsListing,
  "dining-categories-visual-grid": DiningCategoriesVisualGrid,
  "email-capture-band-horizontal": EmailCaptureBandHorizontal,
  "email-capture-closing": EmailCaptureClosing,
  "email-subscription-band-inline-form": EmailSubscriptionBandInlineForm,
  "empty-state-dual-action-centered": EmptyStateDualActionCentered,
  "exhibition-framed-metadata": ExhibitionFramedMetadata,
  "expandable-pricing-features": ExpandablePricingFeatures,
  "faq-accordion-contact-card-alongside": FaqAccordionContactCardAlongside,
  "faq-accordion-minimal-text-only": FaqAccordionMinimalTextOnly,
  "faq-accordion-split-framed-paper": FaqAccordionSplitFramedPaper,
  "faq-accordion-sticky-support-sidebar": FaqAccordionStickySupportSidebar,
  "faq-accordion-tinted-background": FaqAccordionTintedBackground,
  "faq-accordion-two-column-balanced": FaqAccordionTwoColumnBalanced,
  "faq-accordion-two-column-bordered": FaqAccordionTwoColumnBordered,
  "faq-editorial-sidebar-sync": FaqEditorialSidebarSync,
  "faq-grid-cards-expandable": FaqGridCardsExpandable,
  "faq-grid-cards-hover-lift": FaqGridCardsHoverLift,
  "faq-list-icon-divider": FaqListIconDivider,
  "faq-sidebar-editorial-indexed-sticky": FaqSidebarEditorialIndexedSticky,
  "faq-support-cta-hybrid": FaqSupportCtaHybrid,
  "faq-tabbed-pill-filter-categories": FaqTabbedPillFilterCategories,
  "faq-tabbed-searchable-categories": FaqTabbedSearchableCategories,
  "faq-tabs-live-search": FaqTabsLiveSearch,
  "feature-alternating-split-image": FeatureAlternatingSplitImage,
  "feature-asymmetric-bento-motion-focus": FeatureAsymmetricBentoMotionFocus,
  "feature-bento-asymmetric-expandable-motion": FeatureBentoAsymmetricExpandableMotion,
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
  "features-checklist-dense-two-column-marks": FeaturesChecklistDenseTwoColumnMarks,
  "features-dense-checkbox-list": FeaturesDenseCheckboxList,
  "features-tabbed-icon-grid": FeaturesTabbedIconGrid,
  "footer-asymmetric-split": FooterAsymmetricSplit,
  "footer-brand-navigation-inline": FooterBrandNavigationInline,
  "footer-columns-boxed-socials-paired-cta": FooterColumnsBoxedSocialsPairedCta,
  "footer-compact-inline-bar": FooterCompactInlineBar,
  "footer-compact-inline-row": FooterCompactInlineRow,
  "footer-diagonal-stripe": FooterDiagonalStripe,
  "footer-four-column-monochrome-wordmark-minimal": FooterFourColumnMonochromeWordmarkMinimal,
  "footer-giant-wordmark-statement-close": FooterGiantWordmarkStatementClose,
  "footer-grid-blueprint-bordered": FooterGridBlueprintBordered,
  "footer-grid-bordered-cells-newsletter": FooterGridBorderedCellsNewsletter,
  "footer-grid-newsletter-themed": FooterGridNewsletterThemed,
  "footer-inline-blur-wordmark-compact": FooterInlineBlurWordmarkCompact,
  "footer-mega-localized": FooterMegaLocalized,
  "footer-mega-multicolumn-locale-theme": FooterMegaMulticolumnLocaleTheme,
  "footer-mega-sitemap-locale-theme-bar": FooterMegaSitemapLocaleThemeBar,
  "footer-multi-column-sitemap-locale-theme": FooterMultiColumnSitemapLocaleTheme,
  "footer-newsletter-grouped-columns-social": FooterNewsletterGroupedColumnsSocial,
  "footer-vertical-dividers-split": FooterVerticalDividersSplit,
  "footer-wordmark-prominent-outline": FooterWordmarkProminentOutline,
  "full-width-conversion-banner": FullWidthConversionBanner,
  "gallery-bento-hero-supporting-tiles": GalleryBentoHeroSupportingTiles,
  "gallery-editorial-grayscale-indexed": GalleryEditorialGrayscaleIndexed,
  "gallery-exhibition-decor-framed-crossfade": GalleryExhibitionDecorFramedCrossfade,
  "gallery-filterable-portfolio": GalleryFilterablePortfolio,
  "gallery-grid-metrics-column": GalleryGridMetricsColumn,
  "gallery-grid-responsive-uniform": GalleryGridResponsiveUniform,
  "gallery-grid-uniform-responsive": GalleryGridUniformResponsive,
  "gallery-grid-with-stats-column": GalleryGridWithStatsColumn,
  "gallery-hover-reveal-portfolio": GalleryHoverRevealPortfolio,
  "gallery-marquee-infinite-edge-mask": GalleryMarqueeInfiniteEdgeMask,
  "gallery-marquee-infinite-edge-mask-2": GalleryMarqueeInfiniteEdgeMask2,
  "gallery-masonry-caption-hover": GalleryMasonryCaptionHover,
  "gallery-masonry-css-columns-overlay": GalleryMasonryCssColumnsOverlay,
  "gallery-masonry-css-columns-overlay-2": GalleryMasonryCssColumnsOverlay2,
  "gallery-masonry-hover-overlay": GalleryMasonryHoverOverlay,
  "gallery-masonry-offset-variable-reveal": GalleryMasonryOffsetVariableReveal,
  "gallery-masonry-offset-variable-reveal-2": GalleryMasonryOffsetVariableReveal2,
  "gallery-masonry-overlay-cards": GalleryMasonryOverlayCards,
  "gallery-motion-grid-four-tile-hover": GalleryMotionGridFourTileHover,
  "gallery-offset-masonry-varied-heights": GalleryOffsetMasonryVariedHeights,
  "gallery-spotlight-carousel-crossfade": GallerySpotlightCarouselCrossfade,
  "gallery-spotlight-carousel-thumbrail": GallerySpotlightCarouselThumbrail,
  "gallery-spotlight-carousel-thumbrail-2": GallerySpotlightCarouselThumbrail2,
  "gallery-wall-4tile-motion-hover": GalleryWall4tileMotionHover,
  "gallery-wall-4tile-motion-hover-2": GalleryWall4tileMotionHover2,
  "gallery-wall-hover-reveal": GalleryWallHoverReveal,
  "header-centered-underline-hover": HeaderCenteredUnderlineHover,
  "header-dropdown-megamenu-reveal": HeaderDropdownMegamenuReveal,
  "header-editorial-wordmark-slashes": HeaderEditorialWordmarkSlashes,
  "header-flat-monochrome-drawer": HeaderFlatMonochromeDrawer,
  "header-full-width-marketing-cta": HeaderFullWidthMarketingCta,
  "header-full-width-responsive": HeaderFullWidthResponsive,
  "header-search-expandable-utilities": HeaderSearchExpandableUtilities,
  "header-split-asymmetric-auth-cluster": HeaderSplitAsymmetricAuthCluster,
  "header-split-auth": HeaderSplitAuth,
  "header-split-auth-cluster": HeaderSplitAuthCluster,
  "header-sticky-blurred-navigation": HeaderStickyBlurredNavigation,
  "header-sticky-morphing-scroll-animation": HeaderStickyMorphingScrollAnimation,
  "header-sticky-scroll-morphing-blur": HeaderStickyScrollMorphingBlur,
  "header-wordmark-slash-divider-minimal": HeaderWordmarkSlashDividerMinimal,
  "hero-conversion-landing-complete": HeroConversionLandingComplete,
  "hero-customer-success-story": HeroCustomerSuccessStory,
  "hero-editorial-with-stat-hairline": HeroEditorialWithStatHairline,
  "hero-email-waitlist-stats-flow": HeroEmailWaitlistStatsFlow,
  "hero-image-carousel": HeroImageCarousel,
  "hero-left-aligned-dual-cta-metrics-inline": HeroLeftAlignedDualCtaMetricsInline,
  "hero-minimalist-statement": HeroMinimalistStatement,
  "hero-mobile-app-showcase": HeroMobileAppShowcase,
  "hero-parallax-editorial-split": HeroParallaxEditorialSplit,
  "hero-split-dual-cta-framed-product": HeroSplitDualCtaFramedProduct,
  "hero-split-image-showcase": HeroSplitImageShowcase,
  "hero-split-product-screenshot": HeroSplitProductScreenshot,
  "hero-split-screenshot-dual-cta-side": HeroSplitScreenshotDualCtaSide,
  "hero-subscription-selector": HeroSubscriptionSelector,
  "hero-with-analytics-dashboard": HeroWithAnalyticsDashboard,
  "hospitality-tier-selector": HospitalityTierSelector,
  "integrations-directory-searchable-filterable-grid": IntegrationsDirectorySearchableFilterableGrid,
  "integrations-trust-cta": IntegrationsTrustCta,
  "interactive-asymmetric-features-bento": InteractiveAsymmetricFeaturesBento,
  "intro-asymmetric-gallery": IntroAsymmetricGallery,
  "item-list-row-metadata": ItemListRowMetadata,
  "kpi-cards-grid-trend-badges-activity": KpiCardsGridTrendBadgesActivity,
  "kpi-tiles-horizontal-grid-with-delta": KpiTilesHorizontalGridWithDelta,
  "landing-saas-assembled-with-stats-band": LandingSaasAssembledWithStatsBand,
  "landing-startup-with-key-stats-section": LandingStartupWithKeyStatsSection,
  "logo-cloud-bento-asymmetric-featured": LogoCloudBentoAsymmetricFeatured,
  "logo-cloud-bento-featured-partner": LogoCloudBentoFeaturedPartner,
  "logo-cloud-dual-row-opposite-drift": LogoCloudDualRowOppositeDrift,
  "logo-cloud-footer-responsive-strip": LogoCloudFooterResponsiveStrip,
  "logo-cloud-grid-colorize-tooltip": LogoCloudGridColorizeTooltip,
  "logo-cloud-grid-four-column-card": LogoCloudGridFourColumnCard,
  "logo-cloud-grid-pulse-focus-active": LogoCloudGridPulseFocusActive,
  "logo-cloud-ledger-static-bordered-wordmark": LogoCloudLedgerStaticBorderedWordmark,
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
  "portfolio-bento-asymmetric-featured-plus-two": PortfolioBentoAsymmetricFeaturedPlusTwo,
  "portfolio-grid-3column-with-metadata": PortfolioGrid3ColumnWithMetadata,
  "portfolio-grid-showcase": PortfolioGridShowcase,
  "pricing-accordion-expandible-vertical": PricingAccordionExpandibleVertical,
  "pricing-accordion-tier-expandable": PricingAccordionTierExpandable,
  "pricing-cards-three-column-highlighted": PricingCardsThreeColumnHighlighted,
  "pricing-cards-tiered-standard-highlight-featured": PricingCardsTieredStandardHighlightFeatured,
  "pricing-carousel-scroll-snap-filmstrip": PricingCarouselScrollSnapFilmstrip,
  "pricing-carousel-scroll-snap-scale-active": PricingCarouselScrollSnapScaleActive,
  "pricing-duo-tier-split-filled-plain": PricingDuoTierSplitFilledPlain,
  "pricing-inline-single-row-band": PricingInlineSingleRowBand,
  "pricing-ledger-comparison": PricingLedgerComparison,
  "pricing-seat-calculator-slider-dynamic": PricingSeatCalculatorSliderDynamic,
  "pricing-slider-team-seats-animated-calculator": PricingSliderTeamSeatsAnimatedCalculator,
  "pricing-split-tiers-filled-plain": PricingSplitTiersFilledPlain,
  "pricing-table-ledger-comparison-hairline": PricingTableLedgerComparisonHairline,
  "pricing-table-ledger-feature-rows": PricingTableLedgerFeatureRows,
  "pricing-table-matrix-compare-feature-sticky": PricingTableMatrixCompareFeatureSticky,
  "pricing-three-toggle-billing-cycle": PricingThreeToggleBillingCycle,
  "pricing-tier-centered-selector-toggle-billing": PricingTierCenteredSelectorToggleBilling,
  "process-color-animated-steps": ProcessColorAnimatedSteps,
  "process-flow-state-header": ProcessFlowStateHeader,
  "process-horizontal-interactive-clickable-progress": ProcessHorizontalInteractiveClickableProgress,
  "process-horizontal-numbered-row": ProcessHorizontalNumberedRow,
  "process-how-it-works-horizontal-icon-trio": ProcessHowItWorksHorizontalIconTrio,
  "process-how-it-works-vertical-bordered-rail": ProcessHowItWorksVerticalBorderedRail,
  "process-milestone-timeline-vertical-badges": ProcessMilestoneTimelineVerticalBadges,
  "process-phases-status-timeline": ProcessPhasesStatusTimeline,
  "process-sidebar-rail-steps": ProcessSidebarRailSteps,
  "process-stepper-horizontal-interactive-clickable-responsive": ProcessStepperHorizontalInteractiveClickableResponsive,
  "process-stepper-horizontal-interactive-progress": ProcessStepperHorizontalInteractiveProgress,
  "process-stepper-horizontal-numbered-completed-state": ProcessStepperHorizontalNumberedCompletedState,
  "process-stepper-vertical-rail-with-descriptions": ProcessStepperVerticalRailWithDescriptions,
  "process-steps-horizontal-numbered-trio": ProcessStepsHorizontalNumberedTrio,
  "process-steps-vertical-rail-quartet": ProcessStepsVerticalRailQuartet,
  "process-sticky-image-steps": ProcessStickyImageSteps,
  "process-timeline-with-stats": ProcessTimelineWithStats,
  "process-vertical-numbered-rail-steps": ProcessVerticalNumberedRailSteps,
  "process-visual-journey-steps": ProcessVisualJourneySteps,
  "product-bento-six-cell-animated": ProductBentoSixCellAnimated,
  "product-card-interactive": ProductCardInteractive,
  "product-categories-animated": ProductCategoriesAnimated,
  "product-changelog-versioned-grouped-rail": ProductChangelogVersionedGroupedRail,
  "product-gallery-screenshot-featured-thumbstrip": ProductGalleryScreenshotFeaturedThumbstrip,
  "product-grid-featured": ProductGridFeatured,
  "product-integrations-grid-icon-label-dense": ProductIntegrationsGridIconLabelDense,
  "product-plan-spotlight-single-centered-checklist": ProductPlanSpotlightSingleCenteredChecklist,
  "product-pricing-split-2-tier-contrast": ProductPricingSplit2TierContrast,
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
  "roadmap-feature-requests-upvote-interactive": RoadmapFeatureRequestsUpvoteInteractive,
  "role-posting-apply-cta": RolePostingApplyCta,
  "saas-marketing-full-page": SaasMarketingFullPage,
  "service-catalog-priced": ServiceCatalogPriced,
  "service-directory-filterable": ServiceDirectoryFilterable,
  "services-link-grid-split": ServicesLinkGridSplit,
  "services-masonry": ServicesMasonry,
  "solutions-stats-showcase": SolutionsStatsShowcase,
  "specialties-grid": SpecialtiesGrid,
  "startup-landing-with-key-stats": StartupLandingWithKeyStats,
  "stats-band-minimal-four-column": StatsBandMinimalFourColumn,
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
  "testimonial-featured-centered-oversized-quote": TestimonialFeaturedCenteredOversizedQuote,
  "testimonial-featured-centered-quote": TestimonialFeaturedCenteredQuote,
  "testimonial-oversized-quote-avatar-logo": TestimonialOversizedQuoteAvatarLogo,
  "testimonial-spotlight-centered": TestimonialSpotlightCentered,
  "testimonials-cards-animated-blur-grid": TestimonialsCardsAnimatedBlurGrid,
  "testimonials-cards-three-column-blur-stagger-rating": TestimonialsCardsThreeColumnBlurStaggerRating,
  "testimonials-carousel-auto-cycle-selector-crossfade": TestimonialsCarouselAutoCycleSelectorCrossfade,
  "testimonials-carousel-framed-selector-chips": TestimonialsCarouselFramedSelectorChips,
  "testimonials-dense-rating-rows": TestimonialsDenseRatingRows,
  "testimonials-ledger-featured-pull-quote": TestimonialsLedgerFeaturedPullQuote,
  "testimonials-list-dense-rows-avatar-rating-hover": TestimonialsListDenseRowsAvatarRatingHover,
  "testimonials-masonry-varied-height": TestimonialsMasonryVariedHeight,
  "testimonials-masonry-varied-heights": TestimonialsMasonryVariedHeights,
  "testimonials-masonry-wall-varied-heights-organic": TestimonialsMasonryWallVariedHeightsOrganic,
  "testimonials-rows-bordered-hover-wash": TestimonialsRowsBorderedHoverWash,
  "tiered-plan-cards-with-toggle": TieredPlanCardsWithToggle,
  "timeline-bilateral-spine-centered-milestones": TimelineBilateralSpineCenteredMilestones,
  "timeline-milestone-bilateral-alternating-spine": TimelineMilestoneBilateralAlternatingSpine,
  "timeline-milestone-left-rail-vertical": TimelineMilestoneLeftRailVertical,
  "treatment-procedure-steps-vertical": TreatmentProcedureStepsVertical,
};
