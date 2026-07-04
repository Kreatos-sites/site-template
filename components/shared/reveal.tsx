"use client";

import { type ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";

import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * Motor de coreografía del sitio (isla client, patrón leaf: las secciones
 * siguen siendo server components y envuelven su contenido con estos
 * wrappers). Es la ÚNICA coreografía del sitio: misma curva, misma
 * dirección de entrada, intensidad elegida por site.config.ts →
 * design.motion ("none" | "subtle" | "expressive").
 *
 * Reglas duras:
 * - Solo se animan transform y opacity (nunca width/height/top).
 * - prefers-reduced-motion se respeta vía <MotionConfig reducedMotion="user">:
 *   Motion desactiva los desplazamientos y conserva el fade, así el contenido
 *   SIEMPRE llega a visible. NUNCA bifurcar la rama con useReducedMotion():
 *   el hook cambia después de hidratar y deja el style inline del SSR
 *   (opacity:0) huérfano — contenido invisible permanente (bug real).
 * - En "none" no se monta ningún wrapper de motion: div estático (decisión
 *   de build-time del config, idéntica en SSR y cliente).
 */

/** Curva única del sitio */
const EASE = [0.16, 1, 0.3, 1] as const;
/** Duración base (expressive); subtle usa 0.5s */
const BASE_DURATION = 0.6;
/** Desplazamiento base de entrada (expressive); subtle usa 16px */
const BASE_Y = 24;

const VIEWPORT = { once: true, amount: 0.3 } as const;

/**
 * Entrada on-scroll. `delay` (ms) escalona hermanos: en "expressive" las
 * listas usan i * 60ms; en "subtle" el delay se acota (sin stagger
 * protagónico) y en "none" se ignora todo.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const level = config.design.motion;

  if (level === "none") {
    return <div className={className}>{children}</div>;
  }

  const subtle = level === "subtle";

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: subtle ? 16 : BASE_Y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{
          duration: subtle ? 0.5 : BASE_DURATION,
          ease: EASE,
          delay: (subtle ? Math.min(delay, 150) : delay) / 1000,
        }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

/**
 * Contenedor del hero: el ÚNICO momento protagonista del sitio.
 * - "expressive": entrada coreografiada al cargar, con stagger entre sus
 *   <HeroItem> (eyebrow → titular → subtexto → CTAs), 0.08s entre ítems.
 * - "subtle": el bloque completo hace la entrada discreta al cargar.
 * - "none": estático. reduced-motion: fade sin desplazamiento (MotionConfig).
 */
export function HeroStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const level = config.design.motion;

  if (level === "none") {
    return <div className={className}>{children}</div>;
  }

  if (level === "subtle") {
    return (
      <MotionConfig reducedMotion="user">
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {children}
        </motion.div>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

/**
 * Cada bloque del hero (eyebrow, titular, subtexto, CTAs, meta).
 * Solo anima en "expressive"; en los demás niveles es un div pasivo
 * (la entrada la hace el HeroStagger padre o nadie).
 */
export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const level = config.design.motion;

  if (level !== "expressive") {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        variants={{
          hidden: { opacity: 0, y: BASE_Y },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: BASE_DURATION, ease: EASE },
          },
        }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
