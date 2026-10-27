import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Heart, Home, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhotoSlot } from "@/components/photo-slot";
import { MatchTile } from "@/components/match-badge";
import { dogs, getDog } from "@/lib/data/dogs";
import { getShelter } from "@/lib/data/shelters";
import { defaultPreferences } from "@/lib/data/preferences";
import { matchScore, sexLabel, sizeLabel } from "@/lib/match";

export function generateStaticParams() {
  return dogs.map((d) => ({ slug: d.slug }));
}

export default async function DogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dog = getDog(slug);
  if (!dog) notFound();
  const shelter = getShelter(dog.shelterSlug);
  const score = matchScore(dog, defaultPreferences);

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-sand-50 lg:max-w-[1060px] lg:flex-row lg:items-start lg:gap-10 lg:px-8 lg:py-10">
      <div className="relative lg:sticky lg:top-10 lg:w-[480px] lg:shrink-0">
        <PhotoSlot tone={dog.photoTone} priority sizes="(max-width: 1024px) 100vw, 480px" className="h-[280px] lg:h-[520px] lg:rounded-[22px]" label="" />
        <Link
          href="/sugestoes"
          aria-label="Voltar"
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <button
          type="button"
          aria-label="Favoritar"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-coral shadow-sm"
        >
          <Heart className="h-5 w-5 fill-coral" />
        </button>
        <div className="absolute bottom-4 left-4 flex gap-1.5">
          <span className="h-1 w-6 rounded-full bg-white" />
          <span className="h-1 w-2 rounded-full bg-white/50" />
          <span className="h-1 w-2 rounded-full bg-white/50" />
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:min-w-0">
      <div className="flex flex-1 flex-col gap-4 px-6 pt-5 lg:flex-none lg:px-0 lg:pt-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-serif text-[32px] leading-tight text-ink lg:text-[42px]">{dog.name}</h1>
            <p className="mt-0.5 text-[13.5px] text-slate-450">
              {dog.breed} &middot; {sexLabel[dog.sex].toLowerCase()} &middot; {dog.ageYears} anos &middot;{" "}
              {dog.weightKg} kg
            </p>
          </div>
          <MatchTile score={score} />
        </div>

        <div className="flex flex-wrap gap-2">
          {dog.neutered && <Badge variant="moss" className="px-2.5 py-1.5 text-xs">Castrado</Badge>}
          {dog.vaccinated && <Badge variant="moss" className="px-2.5 py-1.5 text-xs">Vacinado</Badge>}
          {dog.goodWithKids && (
            <Badge variant="moss" className="px-2.5 py-1.5 text-xs">Bom com criancas</Badge>
          )}
          <Badge variant="outline" className="px-2.5 py-1.5 text-xs">
            {dog.energy < 0.35 ? "Energia baixa" : dog.energy < 0.7 ? "Energia media" : "Energia alta"}
          </Badge>
          <Badge variant="outline" className="px-2.5 py-1.5 text-xs">
            Porte {sizeLabel[dog.size].toLowerCase()}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-ink/80 lg:text-[15px]">{dog.story}</p>

        {dog.specialNeeds && (
          <p className="rounded-xl bg-coral-50 px-3.5 py-3 text-[13px] leading-relaxed text-coral-700">
            Cuidado especial: {dog.specialNeeds}
          </p>
        )}

        {shelter && (
          <Link
            href={"/abrigos/" + shelter.slug}
            className="flex items-center gap-3 rounded-2xl border border-sand-100 bg-white p-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-petrol text-white">
              <Home className="h-4 w-4" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-ink">{shelter.name}</span>
              <span className="block text-xs text-sand-600">
                {shelter.city} &middot; {dog.distanceKm} km &middot; {shelter.dogsAvailable} caes disponiveis
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-350" />
          </Link>
        )}
      </div>

      <div className="sticky bottom-0 flex gap-2.5 border-t border-sand-100 bg-sand-50 px-6 pb-6 pt-3.5 lg:static lg:mt-8 lg:border-t-0 lg:px-0 lg:pb-0 lg:pt-0">
        <Button variant="outline" size="icon" aria-label="Ligar para o abrigo">
          <Phone className="h-4 w-4" />
        </Button>
        <Button asChild size="lg" className="flex-1">
          <Link href={"/caes/" + dog.slug + "/adotar"}>Quero adotar {dog.name}</Link>
        </Button>
      </div>
      </div>
    </div>
  );
}
