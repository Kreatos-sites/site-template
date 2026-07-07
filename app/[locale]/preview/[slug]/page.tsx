import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeftIcon } from "lucide-react";

import { blockSections } from "@/reference/blocks/registry";
import { PREVIEW_GROUPS, previewFixtures } from "@/reference/preview/fixtures";
import { previewSlug } from "@/reference/preview/slug";
import { ThemeToggle } from "@/components/shared/theme-toggle";

/**
 * Galería de UNA familia — SOLO desarrollo. Renderiza solo los bloques de esa
 * categoría (memoria acotada frente a renderizar los cientos juntos). El registry
 * se compila una vez y se comparte; aquí solo se renderiza el subconjunto.
 */

export const metadata: Metadata = {
  title: "Biblioteca de bloques",
  robots: { index: false, follow: false },
};

export default async function CategoryPreview({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const group = PREVIEW_GROUPS.find((g) => previewSlug(g.category) === slug);
  if (!group) notFound();
  const keys = group.keys.filter((k) => blockSections[k] && previewFixtures[k]);

  return (
    <div className="bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/preview"
              className="flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Volver al índice"
            >
              <ArrowLeftIcon className="size-4" />
            </Link>
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                reference/blocks
              </p>
              <h1 className="mt-1 font-display text-lg leading-tight tracking-tight text-foreground">
                {group.category} · {keys.length}
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {keys.map((key) => {
          const Block = blockSections[key];
          return (
            <div key={key} className="border-t border-dashed border-border/60">
              <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-6 pt-6 lg:px-8">
                <span
                  className="inline-block size-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                <code className="text-[0.6875rem] tracking-wide text-muted-foreground">
                  {key}
                </code>
              </div>
              <Block ns={key} />
            </div>
          );
        })}
      </main>

      <footer className="border-t border-border py-10 text-center text-xs text-muted-foreground">
        <Link href="/preview" className="hover:text-foreground">
          ← Todas las familias
        </Link>
      </footer>
    </div>
  );
}
