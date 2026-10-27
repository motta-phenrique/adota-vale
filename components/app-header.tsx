import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function AppHeader({
  title,
  subtitle,
  backHref,
  action,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex items-start justify-between gap-3 px-5 pb-3 pt-6">
      <div className="flex flex-col gap-1">
        {backHref && (
          <Link href={backHref} className="inline-flex h-8 w-8 items-center text-slate-450" aria-label="Voltar">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
        <h1 className="font-serif text-[27px] leading-tight text-ink">{title}</h1>
        {subtitle && <p className="text-[13px] text-slate-450">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
