"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[5px] w-full grow overflow-hidden rounded-full bg-sand-100">
      <SliderPrimitive.Range className="absolute h-full bg-coral" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-[17px] w-[17px] rounded-full border-[3px] border-coral bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/40" />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";

export { Slider };
