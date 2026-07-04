import type { MetadataRoute } from "next";

import config from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${config.seo.domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
