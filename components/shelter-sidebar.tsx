"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/painel", label: "Visao geral" },
  { href: "/painel/caes", label: "Meus caes" },
  { href: "/painel/solicitacoes", label: "Solicitacoes", count: 7 },
  { href: "/painel/adocoes", label: "Adocoes concluidas" },
  { href: "/painel/perfil", label: "Perfil do abrigo" },
];

export function ShelterSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-full shrink-0 flex-col gap-7 bg-petrol px-4 py-5 text-petrol-200 lg:w-[232px]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-coral text-white">
          <Diamond className="h-3.5 w-3.5" />
        </span>
        <span className="text-[15px] font-semibold text-sand-50">Adota Vale</span>
      </div>

      <nav>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = pathname.startsWith(item.href) && item.href !== "/painel";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center rounded-[9px] px-3 text-sm",
                    // text-* explicito: o `a { text-petrol }` do globals.css sumiria no fundo petrol.
                    active
                      ? "bg-white/[0.12] font-semibold text-sand-50"
                      : "text-petrol-200 hover:bg-white/[0.06] hover:text-sand-50"
                  )}
                >
                  {item.label}
                  {item.count && (
                    <span className="ml-1.5 rounded-full bg-coral px-1.5 py-0.5 text-[11px] text-white">
                      {item.count}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex items-center gap-2.5 border-t border-white/15 pt-3.5">
        <span className="h-8 w-8 rounded-full bg-petrol-600" />
        <span>
          <span className="block text-[13px] text-sand-50">Patas do Ivai</span>
          <span className="block text-[11px]">Ivaipora, PR</span>
        </span>
      </div>
    </aside>
  );
}
