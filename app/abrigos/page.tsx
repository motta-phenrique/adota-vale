import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhotoSlot } from "@/components/photo-slot";
import { AppHeader } from "@/components/app-header";
import { shelters } from "@/lib/data/shelters";

export default function AbrigosPage() {
  return (
    <div className="flex flex-col">
      <AppHeader
        title={shelters.length + " abrigos parceiros"}
        subtitle="Vale do Ivai e regiao centro-norte do Parana"
      />

      <div className="px-5 pb-4">
        <div className="flex h-32 items-center justify-center rounded-2xl border border-[#CBD8D5] bg-[#DDE6E4] text-[10px] uppercase tracking-[0.16em] text-[#7D9490] lg:h-[280px]">
          mapa dos abrigos
        </div>
      </div>

      <ul className="flex flex-col gap-2.5 px-5 lg:grid lg:grid-cols-2 lg:gap-3 xl:grid-cols-3">
        {shelters.map((s) => (
          <li key={s.slug}>
            <Link
              href={"/abrigos/" + s.slug}
              className="flex h-full items-center gap-3 rounded-2xl border border-sand-100 bg-white p-3 transition-colors hover:border-sand-300"
            >
              <PhotoSlot tone={2} sizes="48px" className="h-12 w-12 shrink-0 rounded-xl" label="" />
              <span className="flex-1">
                <span className="block text-[14.5px] font-semibold text-ink">{s.name}</span>
                <span className="block text-xs text-sand-600">
                  {s.city} &middot; {s.dogsAvailable} caes &middot; {s.distanceKm} km
                </span>
              </span>
              {s.verified && <Badge variant="moss">Verificado</Badge>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-5 mt-4 flex flex-col gap-2 rounded-2xl bg-petrol p-4 text-sand-50 lg:mt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-7">
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-[19px] lg:text-[24px]">Seu abrigo ainda nao esta aqui?</h2>
          <p className="text-[12.5px] leading-relaxed text-petrol-200">
            Cadastro gratuito, aprovacao em ate 48h.
          </p>
        </div>
        <Button asChild size="sm" className="mt-1 self-start lg:mt-0 lg:shrink-0 lg:self-center">
          <Link href="/cadastro-abrigo">Quero cadastrar</Link>
        </Button>
      </div>
    </div>
  );
}
