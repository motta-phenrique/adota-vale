import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhotoSlot } from "@/components/photo-slot";
import { shelters, getShelter } from "@/lib/data/shelters";
import { dogsByShelter } from "@/lib/data/dogs";

export function generateStaticParams() {
  return shelters.map((s) => ({ slug: s.slug }));
}

export default async function ShelterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const shelter = getShelter(slug);
  if (!shelter) notFound();
  const caes = dogsByShelter(shelter.slug);

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-sand-50 lg:max-w-[960px] lg:pb-12">
      <div className="relative">
        <PhotoSlot tone={4} priority sizes="(max-width: 1024px) 100vw, 960px" className="h-[150px] lg:h-[300px] lg:rounded-b-[22px]" label="" />
        <Link
          href="/abrigos"
          aria-label="Voltar"
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="relative z-10 -mt-8 flex flex-col gap-3 px-6 lg:-mt-10 lg:px-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-[18px] border-[3px] border-sand-50 bg-petrol text-white">
          <Home className="h-6 w-6" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-[26px] leading-tight text-ink lg:text-[36px]">{shelter.name}</h1>
            {shelter.verified && <Badge variant="moss">Verificado</Badge>}
          </div>
          <p className="mt-1 text-[12.5px] text-sand-600">
            {shelter.address} &middot; {shelter.city}, PR
          </p>
        </div>
        <dl className="flex gap-2.5 lg:max-w-md">
          <Stat label="disponiveis" value={shelter.dogsAvailable} />
          <Stat label="adotados" value={shelter.adoptions} />
          <Stat label="desde" value={shelter.since} />
        </dl>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 pt-4 lg:px-10 lg:pt-6">
        <p className="text-[13.5px] leading-relaxed text-ink/80 lg:max-w-3xl lg:text-[15px]">{shelter.about}</p>
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.14em] text-sand-600">Caes disponiveis</h2>
          <Link href="/buscar" className="text-[12.5px] font-semibold text-coral">
            Ver todos
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-2.5 lg:grid-cols-6 lg:gap-4">
          {caes.map((dog) => (
            <li key={dog.slug}>
              <Link href={"/caes/" + dog.slug} className="flex flex-col gap-1.5">
                <PhotoSlot tone={dog.photoTone} sizes="(max-width: 1024px) 33vw, 150px" className="h-[84px] rounded-xl lg:h-[130px] lg:rounded-2xl" label="" />
                <span className="text-xs font-medium text-ink">{dog.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 flex gap-2.5 border-t border-sand-100 bg-sand-50 px-6 pb-6 pt-3.5 lg:static lg:mt-8 lg:justify-start lg:border-t-0 lg:px-10 lg:pb-0">
        <Button variant="outline" size="lg" className="flex-1 lg:flex-none lg:px-8">
          Como ajudar
        </Button>
        <Button variant="petrol" size="lg" className="flex-1 lg:flex-none lg:px-8">
          Agendar visita
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 rounded-xl border border-sand-100 bg-white p-2.5 text-center">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-lg font-semibold text-ink">{value}</span>
        <span className="block text-[10.5px] text-sand-600">{label}</span>
      </dd>
    </div>
  );
}
