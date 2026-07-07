import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";

type Detail = { icon: string; label: string; value: string };
type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
};

export function ContactImageFloatingCard({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const details = t.raw("details") as Detail[];
  const fields = t.raw("fields") as Field[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: image with floating card of details */}
          <div className="relative lg:col-span-6">
            <Reveal>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm"
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="relative z-10 mx-6 -mt-16 rounded-sm border border-border bg-card p-8 shadow-lg sm:mx-10 lg:-mt-20">
                <ul className="flex flex-col gap-6">
                  {details.map((detail, index) => {
                    const Icon = ICONS[detail.icon] ?? Mail;
                    return (
                      <li key={index} className="flex items-start gap-4">
                        <Icon
                          aria-hidden="true"
                          className="mt-0.5 size-5 shrink-0 text-primary"
                          strokeWidth={1.75}
                        />
                        <span className="flex flex-col gap-0.5">
                          <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                            {detail.label}
                          </span>
                          <span className="font-display text-lg tracking-tight text-foreground">
                            {detail.value}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: message form */}
          <div className="lg:col-span-6 lg:pt-2">
            <Reveal delay={160}>
              <form className="flex flex-col gap-6 rounded-sm border border-border bg-card p-8 sm:p-10">
                {fields.map((field, index) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={5}
                        className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                >
                  {t("submitLabel")}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
