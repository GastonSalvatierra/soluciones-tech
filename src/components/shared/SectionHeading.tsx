import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 md:mb-12",
        align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {/* Bloque único del encabezado: los efectos de scroll mueven TODO el
          bloque a la vez (eyebrow + título + descripción) para que la
          composición nunca se desarme. */}
      <div data-section-heading>
      {eyebrow && (
        <div
          className={cn(
            "mb-4",
            align === "center"
              ? "flex items-center justify-center gap-3"
              : "flex items-center gap-3"
          )}
        >
          <span className="h-px w-7 bg-accent/60" />
          <p className="eyebrow text-accent">{eyebrow}</p>
          <span
            className={cn(
              "h-px w-7 bg-accent/60",
              align === "left" && "hidden"
            )}
          />
        </div>
      )}
      <h2
        className={cn(
          "display text-[1.85rem] font-semibold leading-[1.06] text-foreground sm:text-[2.5rem] md:text-[3.25rem]",
          align === "center" && "text-center"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed text-muted sm:text-base",
            align === "center" && "mx-auto max-w-xl text-center"
          )}
        >
          {description}
        </p>
      )}
      </div>
    </Reveal>
  );
}