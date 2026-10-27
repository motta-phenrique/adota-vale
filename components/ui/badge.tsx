import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium leading-none",
  {
    variants: {
      variant: {
        default: "bg-sand-100 text-ink",
        moss: "bg-moss-50 text-moss-700",
        coral: "bg-coral-50 text-coral-700",
        outline: "border border-sand-200 text-slate-450",
        petrol: "bg-petrol text-sand-50",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
