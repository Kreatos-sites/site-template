import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Envoltura ESTÁNDAR de sección: ritmo vertical (`--section-gap`) + contenedor
 * centrado canónico. TODA sección custom del cuerpo la usa para que el ritmo y
 * el ancho sean IDÉNTICOS en todo el sitio — sin que cada componente (ni cada
 * agente del fan-out, que NO hereda tus skills) improvise su propio `py-*` /
 * `max-w-*`. Antes de esto los sitios salían con 5-7 paddings distintos entre
 * secciones hermanas.
 *
 * Uso normal (95% de los casos):
 *   <Section className="border-t border-border">…contenido…</Section>
 * El `className` va al <section> EXTERIOR (fondo, borde, id de ancla). El
 * contenido queda dentro del contenedor `max-w-6xl px-6 lg:px-8`.
 *
 * Bandas de color / full-bleed: el fondo lo pinta el <section> exterior; el
 * contenido sigue en el contenedor. No hace falta `bleed` para eso.
 *   <Section className="bg-primary text-primary-foreground">…</Section>
 *
 * - `bleed`: el hijo controla TODO el layout horizontal (mosaico a sangre); se
 *   omite el contenedor pero se conserva el ritmo vertical.
 * - `flush`: sin padding vertical (heros/bandas que fijan su propio alto con
 *   `min-h-*`).
 * - `innerClassName`: ajusta el contenedor (p. ej. `max-w-7xl`) cuando el
 *   layout lo pida — la excepción, no la regla.
 */
export function Section({
  children,
  className,
  innerClassName,
  bleed = false,
  flush = false,
  as,
  ...props
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  bleed?: boolean;
  flush?: boolean;
  /** landmark del cuerpo; default <section>. El renderer ya pone <main>. */
  as?: ElementType;
} & HTMLAttributes<HTMLElement>) {
  const Tag = as ?? "section";
  return (
    <Tag className={cn(!flush && "py-(--section-gap)", className)} {...props}>
      {bleed ? (
        children
      ) : (
        <div className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", innerClassName)}>
          {children}
        </div>
      )}
    </Tag>
  );
}
