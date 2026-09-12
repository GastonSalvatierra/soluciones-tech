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
    /* Bloque único del encabezado: TODO el bloque (eyebrow + título +
       descripción) queda ESTÁTICO respecto del scroll — los efectos solo
       mueven el contenido (cards), el título nunca se desplaza ni se desarma. */
    <div
      data-section-heading
      className={cn(
        "mb-8 md:mb-10",
        align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3",
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
          "display text-[1.6rem] font-semibold leading-[1.08] text-foreground sm:text-[2rem] md:text-[2.4rem]",
          align === "center" && "text-center"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-muted sm:text-[15px]",
            align === "center" && "mx-auto max-w-xl text-center"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}