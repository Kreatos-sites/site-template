import type { MetadataRoute } from "next";

import config from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${config.seo.domain}`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/aviso-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
