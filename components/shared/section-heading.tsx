import { cn } from "@/lib/utils";

/**
 * Jerarquía tipográfica consistente en todas las secciones:
 * eyebrow en versalitas con el acento + título display con clamp.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-medium tracking-[0.25em] text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.1] tracking-tight text-balance">
        {title}
      </h2>
    </div>
  );
}
