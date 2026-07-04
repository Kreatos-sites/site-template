import type { SectionConfig } from "@/lib/config";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Coverage } from "@/components/sections/coverage";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
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
      <main id="contenido">{body.map(renderSection)}</main>
      {footer?.id === "footer" && <Footer />}
    </>
  );
}

function renderSection(section: SectionConfig) {
  switch (section.id) {
    case "hero":
      return <Hero key={section.id} {...section} />;
    case "trust-bar":
      return <TrustBar key={section.id} />;
    case "services":
      return <Services key={section.id} {...section} />;
    case "about":
      return <About key={section.id} {...section} />;
    case "process":
      return <Process key={section.id} {...section} />;
    case "portfolio":
      return <Portfolio key={section.id} {...section} />;
    case "coverage":
      return <Coverage key={section.id} />;
    case "testimonials":
      return <Testimonials key={section.id} {...section} />;
    case "faq":
      return <Faq key={section.id} {...section} />;
    case "cta-band":
      return <CtaBand key={section.id} />;
    case "contact":
      return <Contact key={section.id} {...section} />;
    default:
      return null;
  }
}
