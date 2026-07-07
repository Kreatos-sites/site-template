import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/reveal";
import {
  RiBriefcaseLine,
  RiCustomerServiceLine,
  RiFileTextLine,
  RiTeamLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Topic = { value: string; label: string; icon: string };
type Field = { name: string; label: string; type: string; placeholder: string };

const ICONS: Record<string, RemixiconComponentType> = {
  briefcase: RiBriefcaseLine,
  support: RiCustomerServiceLine,
  document: RiFileTextLine,
  team: RiTeamLine,
};

export function ContactFormTopicPills({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const topics = t.raw("topics") as Topic[];
  const fields = t.raw("fields") as Field[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 max-w-md font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <form className="flex flex-col gap-8 rounded-sm border border-border bg-card p-8">
                <fieldset>
                  <legend className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    {t("topicLabel")}
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {topics.map((topic, index) => {
                      const Icon = ICONS[topic.icon] ?? RiBriefcaseLine;
                      const inputId = `contact-topic-${topic.value}`;
                      return (
                        <span key={topic.value} className="relative">
                          <input
                            type="radio"
                            name="topic"
                            id={inputId}
                            value={topic.value}
                            defaultChecked={index === 0}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={inputId}
                            className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"
                          >
                            <Icon aria-hidden="true" className="size-4" />
                            {topic.label}
                          </label>
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-5">
                  {fields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                      <label
                        htmlFor={`contact-${field.name}`}
                        className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
                      >
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={`contact-${field.name}`}
                          name={field.name}
                          placeholder={field.placeholder}
                          rows={5}
                          className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      ) : (
                        <input
                          id={`contact-${field.name}`}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("submitLabel")}
                </button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t("privacyNote")}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
