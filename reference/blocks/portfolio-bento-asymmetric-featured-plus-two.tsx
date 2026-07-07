import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type FeaturedCase = {
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  imageAlt: string;
};

type SupportingProject = {
  title: string;
  category: string;
  image: string;
  imageAlt: string;
};

export function PortfolioBentoAsymmetricFeaturedPlusTwo({
  ns,
}: {
  ns: string;
}) {
  const t = useTranslations(ns);
  const featured = t.raw("featured") as FeaturedCase;
  const supporting = t.raw("supporting") as SupportingProject[];

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
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2">
          <Reveal className="lg:row-span-2">
            <article className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-sm border border-border bg-card lg:min-h-[36rem]">
              <div className="relative flex-1 overflow-hidden">
                <SmartImage
                  src={featured.image}
                  alt={featured.imageAlt}
                  className="absolute inset-0 h-full transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute top-5 left-5 rounded-sm bg-background/90 px-3 py-1 text-xs font-medium tracking-[0.15em] text-foreground uppercase">
                  {featured.category}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-8">
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {featured.client}
                </p>
                <h3 className="font-display text-2xl text-foreground">
                  {featured.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {t("featuredCta")}
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </article>
          </Reveal>

          {supporting.map((project, i) => (
            <Reveal key={i} delay={(i + 1) * 60}>
              <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
                <div className="relative overflow-hidden">
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    className="aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-2 p-6">
                  <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                    {project.category}
                  </p>
                  <h3 className="font-display text-lg text-foreground">
                    {project.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
