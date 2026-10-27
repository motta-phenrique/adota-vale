"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChoiceChip } from "@/components/choice-chip";
import { cn } from "@/lib/utils";
import { coatLabel, coatSwatch, sizeLabel } from "@/lib/match";
import { defaultPreferences } from "@/lib/data/preferences";
import type { Coat, Preferences, Size } from "@/lib/types";

const sizes: { value: Size; glyph: string; hint: string }[] = [
  { value: "pequeno", glyph: "\u25AA", hint: "ate 10 kg" },
  { value: "medio", glyph: "\u25FC", hint: "10-25 kg" },
  { value: "grande", glyph: "\u2B1B", hint: "25 kg +" },
];

const coats = Object.keys(coatLabel) as Coat[];
const TOTAL_STEPS = 5;

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function OnboardingWizard() {
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);
  const step = 2;

  return (
    <>
      <div className="flex flex-col gap-4 px-6 pb-3 pt-6 lg:px-10">
        <div className="flex items-center justify-between text-[13px] text-slate-450">
          <Link href="/cadastro" aria-label="Voltar">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span>
            Etapa {step} de {TOTAL_STEPS}
          </span>
          <Link href="/sugestoes" className="font-semibold text-coral">
            Pular
          </Link>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={cn("h-1 flex-1 rounded-full", i < step ? "bg-petrol" : "bg-sand-200")}
            />
          ))}
        </div>
        <h1 className="font-serif text-[29px] leading-[1.15] text-ink lg:text-[38px]">
          Como voce imagina esse cachorro?
        </h1>
        <p className="text-[13.5px] text-slate-450">
          Pode marcar mais de uma opcao. Nada aqui e definitivo.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-6 pt-1 lg:flex-none lg:gap-8 lg:px-10 lg:pt-4">
        <section className="flex flex-col gap-2.5">
          <h2 className="text-xs uppercase tracking-[0.14em] text-sand-600">Porte</h2>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((s) => {
              const selected = prefs.sizes.includes(s.value);
              return (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setPrefs((p) => ({ ...p, sizes: toggle(p.sizes, s.value) }))}
                  className={cn(
                    "rounded-[14px] bg-white px-2 py-3.5 text-center transition-colors",
                    selected ? "border-2 border-petrol text-ink" : "border border-sand-200 text-slate-450"
                  )}
                >
                  <span className="block text-xl leading-none">{s.glyph}</span>
                  <span className={cn("mt-1 block text-[12.5px]", selected && "font-semibold")}>
                    {sizeLabel[s.value]}
                  </span>
                  <span className="block text-[10.5px] text-slate-350">{s.hint}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-xs uppercase tracking-[0.14em] text-sand-600">Cor da pelagem</h2>
          <div className="flex flex-wrap gap-2.5">
            {coats.map((c) => (
              <ChoiceChip
                key={c}
                selected={prefs.coats.includes(c)}
                onClick={() => setPrefs((p) => ({ ...p, coats: toggle(p.coats, c) }))}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-sand-200"
                  style={
                    c === "bicolor"
                      ? { background: coatSwatch.bicolor }
                      : { backgroundColor: coatSwatch[c] }
                  }
                />
                {coatLabel[c]}
              </ChoiceChip>
            ))}
            <ChoiceChip
              selected={prefs.coats.length === 0}
              onClick={() => setPrefs((p) => ({ ...p, coats: [] }))}
            >
              Tanto faz
            </ChoiceChip>
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-xs uppercase tracking-[0.14em] text-sand-600">Nivel de energia</h2>
          <div className="rounded-[14px] border border-sand-200 bg-white px-3.5 pb-3 pt-4">
            <Slider
              value={[prefs.energy * 100]}
              onValueChange={([v]) => setPrefs((p) => ({ ...p, energy: v / 100 }))}
              max={100}
              step={1}
              aria-label="Nivel de energia"
            />
            <div className="mt-3 flex justify-between text-[11.5px] text-slate-350">
              <span>Bem calmo</span>
              <span>Equilibrado</span>
              <span>Muita energia</span>
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-sand-100 px-6 pb-7 pt-4 lg:mt-10 lg:px-10">
        <Button asChild variant="petrol" size="lg" className="w-full">
          <Link href="/sugestoes">Continuar</Link>
        </Button>
      </div>
    </>
  );
}
