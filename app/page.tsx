import { SectionRenderer } from "@/components/shared/section-renderer";
import config from "@/site.config";

export default function HomePage() {
  return <SectionRenderer sections={config.sections} />;
}
