import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { PREVIEW_GROUPS, previewFixtures } from "@/reference/preview/fixtures";
import { previewSlug } from "@/reference/preview/slug";

/**
 * Índice de la biblioteca de bloques (`reference/blocks/`) — SOLO desarrollo.
 * Lista las categorías; cada una abre en su propia ruta para renderizar POCOS
 * bloques por página (si se renderizaran los cientos juntos, el dev server se
 * queda sin memoria). NO se sirve en producción.
 */

export const metadata: Metadata = {
  title: "Biblioteca de bloques",
  robots: { index: false, follow: false },
};

export default async function PreviewIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(locale);

  const total = PREVIEW_GROUPS.reduce((n, g) => n + g.keys.length, 0);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
          Kreatos · reference/blocks
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-tight text-foreground">
          Biblioteca de bloques
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {total} arquetipos en {PREVIEW_GROUPS.length} familias. Abre una familia
          para verlos renderizados.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PREVIEW_GROUPS.map((g) => {
            const withFixture = g.keys.filter((k) => previewFixtures[k]).length;
            return (
              <li key={g.category} className="bg-card">
                <Link
                  href={`/preview/${previewSlug(g.category)}`}
                  className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="font-display text-lg tracking-tight text-foreground">
                    {g.category}
                  </span>
                  <span className="text-xs tracking-wide text-muted-foreground tabular-nums">
                    {withFixture} bloque{withFixture === 1 ? "" : "s"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
