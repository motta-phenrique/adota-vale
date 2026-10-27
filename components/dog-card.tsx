import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PhotoSlot } from "@/components/photo-slot";
import { MatchBadge } from "@/components/match-badge";
import { getShelter } from "@/lib/data/shelters";
import { coatLabel, sizeLabel, sexLabel } from "@/lib/match";
import type { Dog } from "@/lib/types";

export function DogRow({ dog, score }: { dog: Dog; score?: number }) {
  const shelter = getShelter(dog.shelterSlug);
  return (
    <Link
      href={"/caes/" + dog.slug}
      className="flex h-full gap-3.5 rounded-2xl border border-sand-100 bg-white p-3 transition-colors hover:border-sand-300"
    >
      <PhotoSlot tone={dog.photoTone} sizes="92px" className="h-[92px] w-[92px] shrink-0 rounded-[14px]" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-semibold text-ink">{dog.name}</span>
          {score !== undefined && <MatchBadge score={score} />}
        </div>
        <div className="text-[12.5px] text-slate-450">
          {dog.breed} &middot; {sizeLabel[dog.size].toLowerCase()} &middot; {dog.ageYears} anos &middot;{" "}
          {sexLabel[dog.sex].toLowerCase()}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {dog.goodWithKids && <Badge variant="moss">Bom com criancas</Badge>}
          <Badge variant={dog.coat === "branco" ? "moss" : "coral"}>{coatLabel[dog.coat]}</Badge>
          {dog.specialNeeds && <Badge variant="outline">Necessidades especiais</Badge>}
        </div>
        <div className="text-[11.5px] text-sand-500">
          {shelter?.name} &middot; {dog.distanceKm} km
        </div>
      </div>
    </Link>
  );
}

export function DogTile({ dog, favorited }: { dog: Dog; favorited?: boolean }) {
  const shelter = getShelter(dog.shelterSlug);
  return (
    <Link
      href={"/caes/" + dog.slug}
      className="flex h-full flex-col gap-2 rounded-[18px] border border-sand-100 bg-white p-2 pb-3 transition-colors hover:border-sand-300"
    >
      <PhotoSlot tone={dog.photoTone} sizes="(max-width: 1024px) 50vw, 240px" className="h-[108px] rounded-xl" label="">
        <span className="flex h-full w-full items-start justify-end p-2">
          <Heart
            className={favorited ? "h-4 w-4 fill-coral text-coral" : "h-4 w-4 text-white"}
          />
        </span>
      </PhotoSlot>
      <div className="flex flex-col gap-0.5 px-1">
        <div className="text-base font-semibold text-ink">{dog.name}</div>
        <div className="text-[11.5px] text-slate-450">
          {dog.breed} &middot; {dog.ageYears} anos
        </div>
        <div className="text-[11px] text-sand-500">
          {shelter?.city} &middot; {dog.distanceKm} km
        </div>
      </div>
    </Link>
  );
}
