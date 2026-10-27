"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Diamond, Search, Heart, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/sugestoes", label: "Sugestoes", Icon: Diamond },
  { href: "/buscar", label: "Buscar", Icon: Search },
  { href: "/favoritos", label: "Favoritos", Icon: Heart },
  { href: "/abrigos", label: "Abrigos", Icon: Home },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-20 border-t border-sand-100 bg-white lg:hidden">
      <ul className="mx-auto flex max-w-lg items-center justify-around px-4 pb-5 pt-3">
        {items.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex min-h-11 min-w-[64px] flex-col items-center gap-1 text-[10.5px]",
                  active ? "font-semibold text-petrol" : "text-slate-250"
                )}
              >
                <Icon className={cn("h-[18px] w-[18px]", active && "fill-petrol/10")} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
