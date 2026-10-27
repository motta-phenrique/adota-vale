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

/** Navegacao lateral do desktop. Espelha a BottomNav, que some a partir de lg. */
export function SideNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[236px] lg:shrink-0 lg:flex-col lg:gap-8 lg:border-r lg:border-sand-100 lg:bg-white lg:px-4 lg:py-6">
      <Link href="/sugestoes" className="flex items-center gap-2.5 px-2">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-coral text-white">
          <Diamond className="h-3.5 w-3.5" />
        </span>
        <span className="text-[15px] font-semibold text-ink">Adota Vale</span>
      </Link>

      <nav>
        <ul className="flex flex-col gap-1">
          {items.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm transition-colors",
                    active
                      ? "bg-petrol/[0.08] font-semibold text-petrol"
                      : "text-slate-450 hover:bg-sand-50"
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

      <div className="mt-auto flex flex-col gap-3 border-t border-sand-100 pt-4">
        <Link href="/perfil" className="flex items-center gap-2.5 px-1">
          <span className="h-8 w-8 shrink-0 rounded-full bg-sand-300" />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-ink">Marina</span>
            <span className="block text-[11px] text-sand-600">Ver perfil</span>
          </span>
        </Link>
        <Link
          href="/cadastro-abrigo"
          className="rounded-[10px] bg-sand-50 px-3 py-2.5 text-[12px] leading-snug text-sand-600 transition-colors hover:bg-sand-100"
        >
          Sou um abrigo <span className="font-semibold text-petrol">Acessar painel</span>
        </Link>
      </div>
    </aside>
  );
}
