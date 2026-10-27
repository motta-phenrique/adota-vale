"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-[42px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol/40 disabled:opacity-50",
      "data-[state=checked]:bg-moss data-[state=unchecked]:bg-sand-200",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-[18px] w-[18px] rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-0" />
  </SwitchPrimitives.Root>
));
Switch.displayName = "Switch";

export { Switch };
