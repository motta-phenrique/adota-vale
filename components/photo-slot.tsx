import { cn } from "@/lib/utils";
import Image from "next/image";

/** Foto do cão. Os arquivos ficam em public/uploads e são servidos em /uploads. */
export function PhotoSlot({
  tone = 1,
  label = "foto",
  className,
  sizes = "(max-width: 1024px) 50vw, 33vw",
  priority,
  children,
}: {
  tone?: string | number;
  label?: string;
  className?: string;
  /** Largura renderizada, para o Next servir o arquivo no tamanho certo. */
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const file = String(tone).replace(/\.\w+$/, "");

  return (
    <span className={cn("relative block overflow-hidden bg-sand-100", className)}>
      <Image
        src={`/uploads/${file}.jpeg`}
        alt={label}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {children ? <span className="absolute inset-0">{children}</span> : null}
    </span>
  );
}
