import type { ComponentType } from "react";
import type { SectionConfig } from "@/lib/config";

import { customSections } from "@/components/custom/registry";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Coverage } from "@/components/sections/coverage";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { PageHeader } from "@/components/sections/page-header";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBar } from "@/components/sections/trust-bar";

/**
 * Motor de composición: recibe config.sections y renderiza en ese orden.
 * navbar y footer se extraen para envolver <main> con landmarks correctos.
 */
export function SectionRenderer({ sections }: { sections: SectionConfig[] }) {
  const navbar = sections.find((s) => s.id === "navbar");
  const footer = sections.find((s) => s.id === "footer");
  const body = sections.filter((s) => s.id !== "navbar" && s.id !== "footer");

  return (
    <>
      {navbar?.id === "navbar" && <Navbar {...navbar} />}
      <main id="contenido">
        {body.map((section, index) => renderSection(section, index))}
      </main>
      {footer?.id === "footer" && <Footer {...footer} />}
    </>
  );
}

function renderSection(section: SectionConfig, index: number) {
  switch (section.id) {
    case "custom": {
      // Cast defensivo: el agente reescribe registry.ts y a veces omite el
      // tipo Record<...> — sin index signature este acceso no compila. El
      // motor no debe depender de cómo quedó tipado el registry.
      const Custom = (
        customSections as Record<string, ComponentType<{ ns: string }>>
      )[section.component];
      // Componente no registrado = error duro en build/dev, nunca silencio:
      // validate-config lo detecta antes, pero este throw cubre dev server.
      if (!Custom) {
        throw new Error(
          `[section-renderer] la sección custom "${section.component}" no está registrada en components/custom/registry.ts. ` +
            `Keys disponibles: ${Object.keys(customSections).join(", ") || "(ninguna)"}`,
        );
      }
      return <Custom key={`custom-${section.component}-${index}`} ns={section.ns} />;
    }
    case "page-header":
      return <PageHeader key={section.id} {...section} />;
    case "hero":
      return <Hero key={section.id} {...section} />;
    case "trust-bar":
      return <TrustBar key={section.id} {...section} />;
    case "services":
      return <Services key={section.id} {...section} />;
    case "about":
      return <About key={section.id} {...section} />;
    case "process":
      return <Process key={section.id} {...section} />;
    case "portfolio":
      return <Portfolio key={section.id} {...section} />;
    case "coverage":
      return <Coverage key={section.id} {...section} />;
    case "testimonials":
      return <Testimonials key={section.id} {...section} />;
    case "faq":
      return <Faq key={section.id} {...section} />;
    case "cta-band":
      return <CtaBand key={section.id} {...section} />;
    case "contact":
      return <Contact key={section.id} {...section} />;
    default:
      return null;
  }
}
