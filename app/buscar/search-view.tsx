"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ChoiceChip } from "@/components/choice-chip";
import { DogTile } from "@/components/dog-card";
import { ageLabel, sexLabel, sizeLabel, coatLabel } from "@/lib/match";
import type { AgeBand, Coat, Dog, Preferences, Sex, Size } from "@/lib/types";

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const emptyPrefs: Preferences = {
  sizes: [], coats: [], ages: [], sexes: [], energy: 0.5,
  goodWithKids: false, goodWithPets: false, acceptSpecialNeeds: true, maxDistanceKm: 60,
};

export function SearchView({ dogs, initialPrefs }: { dogs: Dog[]; initialPrefs: Preferences }) {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [prefs, setPrefs] = useState(initialPrefs);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dogs.filter((d) => {
      if (d.adopted) return false;
      if (q && !(d.name + " " + d.breed).toLowerCase().includes(q)) return false;
      if (prefs.sizes.length && !prefs.sizes.includes(d.size)) return false;
      if (prefs.coats.length && !prefs.coats.includes(d.coat)) return false;
      if (prefs.ages.length && !prefs.ages.includes(d.ageBand)) return false;
      if (prefs.sexes.length && !prefs.sexes.includes(d.sex)) return false;
      if (prefs.goodWithKids && !d.goodWithKids) return false;
      if (prefs.goodWithPets && !d.goodWithPets) return false;
      if (!prefs.acceptSpecialNeeds && d.specialNeeds) return false;
      if (d.distanceKm > prefs.maxDistanceKm) return false;
      return true;
    });
  }, [dogs, query, prefs]);

  const filters = <FilterFields prefs={prefs} setPrefs={setPrefs} />;
  const clear = () => setPrefs(emptyPrefs);

  return (
    <div className="relative flex min-h-full flex-col lg:flex-row lg:items-start lg:gap-7 lg:pt-9">
      {/* Desktop: filtros sempre visiveis numa coluna propria. */}
      <aside className="hidden lg:sticky lg:top-6 lg:block lg:w-[272px] lg:shrink-0 lg:rounded-2xl lg:border lg:border-sand-100 lg:bg-white lg:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">Filtros</h2>
          <button type="button" onClick={clear} className="text-[12.5px] font-semibold text-coral">
            Limpar tudo
          </button>
        </div>
        <div className="flex flex-col gap-4">{filters}</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-col gap-3 px-5 pb-3 pt-6 lg:px-0 lg:pt-0">
          <div className="relative lg:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-350" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Raca, nome ou abrigo"
              className="pl-10"
              aria-label="Buscar caes"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-slate-450">{results.length} caes encontrados</p>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtros
            </Button>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 px-5 pb-6 lg:grid-cols-3 lg:gap-5 lg:px-0 xl:grid-cols-4">
          {results.map((dog) => (
            <li key={dog.slug}>
              <DogTile dog={dog} />
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: mesmo conteudo num bottom sheet. */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-lg lg:hidden">
          <div className="max-h-[88dvh] overflow-y-auto rounded-t-[26px] bg-white shadow-[0_-12px_40px_rgba(16,36,47,0.16)]">
            <div className="flex flex-col gap-3 px-5 pb-2.5 pt-3.5">
              <span className="mx-auto h-1 w-10 rounded-full bg-sand-200" />
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-ink">Filtros</h2>
                <button type="button" onClick={clear} className="text-[12.5px] font-semibold text-coral">
                  Limpar tudo
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-5">{filters}</div>

            <div className="mt-4 border-t border-sand-100 px-5 pb-6 pt-3.5">
              <Button size="lg" className="w-full" onClick={() => setOpen(false)}>
                Ver {results.length} resultados
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterFields({
  prefs,
  setPrefs,
}: {
  prefs: Preferences;
  setPrefs: React.Dispatch<React.SetStateAction<Preferences>>;
}) {
  return (
    <>
      <FilterGroup label="Porte">
        {(Object.keys(sizeLabel) as Size[]).map((s) => (
          <ChoiceChip
            key={s}
            selected={prefs.sizes.includes(s)}
            onClick={() => setPrefs((p) => ({ ...p, sizes: toggle(p.sizes, s) }))}
          >
            {sizeLabel[s]}
          </ChoiceChip>
        ))}
      </FilterGroup>

      <FilterGroup label="Cor da pelagem">
        {(Object.keys(coatLabel) as Coat[]).map((c) => (
          <ChoiceChip
            key={c}
            selected={prefs.coats.includes(c)}
            onClick={() => setPrefs((p) => ({ ...p, coats: toggle(p.coats, c) }))}
          >
            {coatLabel[c]}
          </ChoiceChip>
        ))}
      </FilterGroup>

      <FilterGroup label="Idade">
        {(Object.keys(ageLabel) as AgeBand[]).map((a) => (
          <ChoiceChip
            key={a}
            selected={prefs.ages.includes(a)}
            onClick={() => setPrefs((p) => ({ ...p, ages: toggle(p.ages, a) }))}
          >
            {ageLabel[a]}
          </ChoiceChip>
        ))}
      </FilterGroup>

      <FilterGroup label="Sexo">
        {(Object.keys(sexLabel) as Sex[]).map((s) => (
          <ChoiceChip
            key={s}
            selected={prefs.sexes.includes(s)}
            onClick={() => setPrefs((p) => ({ ...p, sexes: toggle(p.sexes, s) }))}
          >
            {sexLabel[s]}
          </ChoiceChip>
        ))}
      </FilterGroup>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">Convivencia</h3>
        <SwitchRow
          label="Bom com criancas"
          checked={prefs.goodWithKids}
          onChange={(v) => setPrefs((p) => ({ ...p, goodWithKids: v }))}
        />
        <SwitchRow
          label="Bom com outros animais"
          checked={prefs.goodWithPets}
          onChange={(v) => setPrefs((p) => ({ ...p, goodWithPets: v }))}
        />
        <SwitchRow
          label="Aceita necessidades especiais"
          checked={prefs.acceptSpecialNeeds}
          onChange={(v) => setPrefs((p) => ({ ...p, acceptSpecialNeeds: v }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">Distancia</h3>
          <span className="text-[12.5px] text-slate-450">ate {prefs.maxDistanceKm} km</span>
        </div>
        <Slider
          value={[prefs.maxDistanceKm]}
          onValueChange={([v]) => setPrefs((p) => ({ ...p, maxDistanceKm: v }))}
          min={5}
          max={60}
          step={1}
          aria-label="Distancia maxima"
        />
      </div>
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">{label}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-center justify-between text-sm text-ink">
      <span>{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
