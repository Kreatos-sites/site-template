import type { ComponentType } from "react";

import { AgencyCredit } from "@/components/shared/agency-credit";
import { customSections } from "@/components/custom/registry";
import type { SectionConfig } from "@/lib/config";

/**
 * Motor de composición 100%-custom: recibe config.sections (todas custom) y las
 * renderiza en orden. El motor GARANTIZA los landmarks — <header>, <main>,
 * <footer> — y el crédito de agencia, envolviendo las secciones custom:
 *  - slot "header": va en <header> (una sola, va arriba).
 *  - slot "footer": va en <footer>, con <AgencyCredit/> inyectado debajo
 *    (fuera del control del autor: el agente no lo puede quitar).
 *  - slot "body" (default): dentro de <main>, en el orden del array.
 * Así el DISEÑO de cada sección es único por sitio, pero la semántica de
 * accesibilidad y la atribución quedan resueltas por el motor.
 */
export function SectionRenderer({ sections }: { sections: SectionConfig[] }) {
  const header = sections.find((s) => s.slot === "header");
  const footer = sections.find((s) => s.slot === "footer");
  const body = sections.filter((s) => (s.slot ?? "body") === "body");

  return (
    <>
      {header && <header>{renderSection(header, "header")}</header>}
      <main id="contenido">
        {body.map((section, index) => renderSection(section, `body-${index}`))}
      </main>
      <footer>
        {footer && renderSection(footer, "footer")}
        {/* Crédito de agencia INYECTADO por el motor: agent-proof. */}
        <div className="border-t border-border">
          <div className="mx-auto flex w-full max-w-6xl justify-center px-6 py-4 lg:px-8">
            <AgencyCredit className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline" />
          </div>
        </div>
      </footer>
    </>
  );
}

function renderSection(section: SectionConfig, keyHint: string) {
  const Custom = (
    customSections as Record<string, ComponentType<{ ns: string }>>
  )[section.component];
  // Componente no registrado = error duro en build/dev, nunca silencio:
  // validate-config lo detecta antes, pero este throw cubre el dev server.
  if (!Custom) {
    throw new Error(
      `[section-renderer] la sección custom "${section.component}" no está registrada en components/custom/registry.ts. ` +
        `Keys disponibles: ${Object.keys(customSections).join(", ") || "(ninguna)"}`,
    );
  }
  return <Custom key={`${keyHint}-${section.component}`} ns={section.ns} />;
}
