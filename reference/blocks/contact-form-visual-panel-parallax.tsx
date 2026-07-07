import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

type ContactPoint = { icon: string; label: string; value: string };

const ICONS: Record<string, typeof MailIcon> = {
  mail: MailIcon,
  phone: PhoneIcon,
  location: MapPinIcon,
};

export function ContactFormVisualPanelParallax({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const points = t.raw("points") as ContactPoint[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-border lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-10 bg-card p-8 sm:p-10 lg:p-12">
              <div>
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                  {t("title")}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t("description")}
                </p>
              </div>

              <form className="flex flex-col gap-5" aria-label={t("formLabel")}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {t("form.nameLabel")}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder={t("form.namePlaceholder")}
                      className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {t("form.emailLabel")}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("form.subjectLabel")}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder={t("form.subjectPlaceholder")}
                    className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("form.messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder={t("form.messagePlaceholder")}
                    className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary sm:w-fit"
                >
                  {t("form.submitLabel")}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative h-72 lg:h-full lg:min-h-[38rem]">
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-foreground/60" />
              <ul className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-8 sm:p-10 lg:p-12">
                {points.map((point, i) => {
                  const Icon = ICONS[point.icon] ?? MailIcon;
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <Icon className="mt-0.5 size-5 shrink-0 text-background" strokeWidth={1.75} />
                      <div>
                        <p className="text-xs font-medium tracking-[0.15em] text-background/70 uppercase">
                          {point.label}
                        </p>
                        <p className="mt-1 text-sm text-background">{point.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
