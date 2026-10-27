"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DogRow, DogTile } from "@/components/dog-card";
import { ChoiceChip } from "@/components/choice-chip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coatLabel, sizeLabel } from "@/lib/match";
import type { Dog, Preferences } from "@/lib/types";

type Ranked = { dog: Dog; score: number }[];

export function SuggestionsView({ ranked, prefs }: { ranked: Ranked; prefs: Preferences }) {
  const [view, setView] = useState<"lista" | "grade">("lista");
  const [sort, setSort] = useState("Relevancia");

  const list =
    sort === "Mais perto"
      ? [...ranked].sort((a, b) => a.dog.distanceKm - b.dog.distanceKm)
      : ranked;

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between gap-3 px-5 pb-4 pt-6 lg:pt-9">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-slate-350">Boa tarde, Marina</p>
          <h1 className="font-serif text-[25px] leading-tight text-ink">
            {ranked.length} caes combinam com voce
          </h1>
        </div>
        <Link
          href="/perfil"
          aria-label="Seu perfil"
          className="h-10 w-10 shrink-0 rounded-full bg-sand-300 lg:hidden"
        />
      </header>

      <div className="flex gap-2 overflow-x-auto px-5 pb-3.5 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible">
        {prefs.sizes.map((s) => (
          <ChoiceChip key={s} selected>
            Porte {sizeLabel[s].toLowerCase()}
          </ChoiceChip>
        ))}
        {prefs.coats.map((c) => (
          <ChoiceChip key={c}>{coatLabel[c]}</ChoiceChip>
        ))}
        <ChoiceChip>{prefs.energy < 0.4 ? "Calmo" : "Ativo"}</ChoiceChip>
        <Link
          href="/buscar"
          aria-label="Adicionar filtro"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-sand-400 text-sand-600"
        >
          <Plus className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-3">
        <Tabs value={view} onValueChange={(v) => setView(v as "lista" | "grade")}>
          <TabsList>
            <TabsTrigger value="lista">Lista com %</TabsTrigger>
            <TabsTrigger value="grade">Grade</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs value={sort} onValueChange={setSort}>
          <TabsList>
            <TabsTrigger value="Relevancia">Relevancia</TabsTrigger>
            <TabsTrigger value="Mais perto">Mais perto</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "lista" ? (
        <ul className="flex flex-col gap-3 px-5 lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3">
          {list.map(({ dog, score }) => (
            <li key={dog.slug}>
              <DogRow dog={dog} score={score} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 gap-3.5 px-5 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
          {list.map(({ dog }) => (
            <li key={dog.slug}>
              <DogTile dog={dog} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
