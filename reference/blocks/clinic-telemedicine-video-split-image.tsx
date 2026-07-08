import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { VideoCameraIcon, CheckCircleIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * BLOQUE: clinic-telemedicine-video-split-image — split asimétrico y aireado
 * para telemedicina/consulta remota. Columna izquierda con eyebrow, título,
 * descripción, lista de beneficios con check y CTA sobre fondo claro; columna
 * derecha con mockup de videollamada/app de consulta en imagen de esquinas
 * redondeadas, sin overlay ni gradiente. Se apila en mobile.
 *
 * ns: { eyebrow, title, description, benefits: [{title, text}], cta: {label, href},
 *       image, imageAlt }
 */
export function ClinicTelemedicineVideoSplitImage({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const benefits = t.raw("benefits") as { title: string; text: string }[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Columna texto */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex size-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <VideoCameraIcon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
                {t("description")}
              </p>
            </Reveal>

            <ul className="mt-10 space-y-5">
              {benefits.map((benefit, i) => (
                <li key={benefit.title}>
                  <Reveal delay={80 + i * 60}>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        weight="fill"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-display text-base text-foreground">
                          {benefit.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {benefit.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={80 + benefits.length * 60}>
              <a
                href={t("cta.href")}
                className="mt-10 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("cta.label")}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Columna imagen: mockup de videollamada */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-lg sm:aspect-[16/11]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
