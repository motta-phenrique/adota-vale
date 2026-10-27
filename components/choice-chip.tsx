"use client";

import { cn } from "@/lib/utils";

export function ChoiceChip({
  children,
  selected,
  onClick,
  className,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 text-[13px] transition-colors",
        selected
          ? "bg-petrol text-sand-50"
          : "border border-sand-200 bg-white text-ink hover:border-sand-400",
        className
      )}
    >
      {children}
    </button>
  );
}
