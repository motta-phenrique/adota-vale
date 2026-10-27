"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ChoiceChip } from "@/components/choice-chip";
import { PhotoSlot } from "@/components/photo-slot";
import { cn } from "@/lib/utils";
import { coatLabel, coatSwatch, sexLabel, sizeLabel } from "@/lib/match";
import { dogs } from "@/lib/data/dogs";
import { defaultPreferences } from "@/lib/data/preferences";
import { matchScore } from "@/lib/match";
import type { Coat, Dog, Sex, Size } from "@/lib/types";

const traits = [
  { key: "kids", label: "Bom com criancas" },
  { key: "dogs", label: "Bom com outros caes" },
  { key: "cats", label: "Bom com gatos" },
  { key: "special", label: "Necessidades especiais" },
] as const;

export function NewDogForm() {
  const [size, setSize] = useState<Size>("pequeno");
  const [coat, setCoat] = useState<Coat>("branco");
  const [sex, setSex] = useState<Sex>("femea");
  const [energy, setEnergy] = useState(58);
  const [active, setActive] = useState<string[]>(["kids", "dogs"]);

  const draft = useMemo<Dog>(
    () => ({
      slug: "novo", name: "Zelda", breed: "Maltes", size, coat, sex,
      ageYears: 3, ageBand: "adulto", weightKg: 6.4, energy: energy / 100,
      goodWithKids: active.includes("kids"),
      goodWithPets: active.includes("dogs") || active.includes("cats"),
      specialNeeds: active.includes("special") ? "Informar no perfil" : null,
      neutered: true, vaccinated: true, story: "", shelterSlug: "patas-do-ivai",
      distanceKm: 3.2, photoTone: "1",
    }),
    [size, coat, sex, energy, active]
  );

  const score = matchScore(draft, defaultPreferences);
  const reach = Math.round((score / 100) * 48) + 5;
  const completeness = 60 + active.length * 4;

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-100 bg-white px-8 py-5">
        <div>
          <h1 className="font-serif text-[26px] text-ink">Cadastrar novo cao</h1>
          <p className="mt-0.5 text-[13px] text-sand-600">
            Os campos de caracteristica alimentam as sugestoes para os adotantes.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button type="button" variant="outline" size="sm">
            Salvar rascunho
          </Button>
          <Button type="submit" size="sm">
            Publicar cao
          </Button>
        </div>
      </header>

      <form className="grid flex-1 grid-cols-1 gap-7 px-8 py-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-3">
            <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Identificacao</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field id="nome" label="Nome" placeholder="Zelda" />
              <Field id="raca" label="Raca" placeholder="Maltes" />
              <Field id="idade" label="Idade estimada" placeholder="3 anos" />
              <Field id="peso" label="Peso" placeholder="6,4 kg" />
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">
              Caracteristicas que geram sugestoes
            </h2>
            <div className="flex flex-col gap-3 rounded-[14px] border border-sand-100 bg-white p-4">
              <Row label="Porte">
                {(Object.keys(sizeLabel) as Size[]).map((s) => (
                  <ChoiceChip key={s} selected={size === s} onClick={() => setSize(s)}>
                    {sizeLabel[s]}
                  </ChoiceChip>
                ))}
              </Row>

              <Row label="Cor">
                {(Object.keys(coatLabel) as Coat[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCoat(c)}
                    aria-label={coatLabel[c]}
                    aria-pressed={coat === c}
                    className={cn(
                      "h-[26px] w-[26px] rounded-full",
                      coat === c ? "border-[3px] border-petrol" : "border border-sand-200"
                    )}
                    style={
                      c === "bicolor"
                        ? { background: coatSwatch.bicolor }
                        : { backgroundColor: coatSwatch[c] }
                    }
                  />
                ))}
              </Row>

              <Row label="Sexo">
                {(Object.keys(sexLabel) as Sex[]).map((s) => (
                  <ChoiceChip key={s} selected={sex === s} onClick={() => setSex(s)}>
                    {sexLabel[s]}
                  </ChoiceChip>
                ))}
              </Row>

              <Row label="Energia">
                <div className="min-w-[200px] max-w-[320px] flex-1">
                  <Slider
                    value={[energy]}
                    onValueChange={([v]) => setEnergy(v)}
                    max={100}
                    step={1}
                    aria-label="Nivel de energia"
                  />
                </div>
              </Row>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {traits.map((t) => (
                  <ChoiceChip
                    key={t.key}
                    selected={active.includes(t.key)}
                    onClick={() =>
                      setActive((a) =>
                        a.includes(t.key) ? a.filter((k) => k !== t.key) : [...a, t.key]
                      )
                    }
                  >
                    {t.label}
                  </ChoiceChip>
                ))}
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="historia">Historia e temperamento</Label>
            <Textarea
              id="historia"
              name="historia"
              placeholder="Resgatada em maio, muito docil e sociavel. Ja esta castrada e com vacinas em dia."
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2.5">
            <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Fotos</h2>
            <PhotoSlot tone={1} label="foto principal" className="h-44 rounded-[14px]" />
            <div className="grid grid-cols-3 gap-2.5">
              <PhotoSlot tone={3} className="h-16 rounded-[10px]" label="" />
              <PhotoSlot tone={2} className="h-16 rounded-[10px]" label="" />
              <label className="flex h-16 cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-sand-400 text-sand-500">
                <input type="file" accept="image/*" className="sr-only" />
                <Plus className="h-4 w-4" />
              </label>
            </div>
          </section>

          <section className="flex flex-col gap-2.5 rounded-[14px] border border-sand-100 bg-white p-4">
            <h2 className="text-[13px] font-semibold text-ink">Previa da compatibilidade</h2>
            <p className="text-[12.5px] leading-relaxed text-slate-450">
              Com esses dados, este cao apareceria como sugestao para{" "}
              <strong className="text-ink">{reach} adotantes</strong> da regiao.
            </p>
            <div className="flex items-center gap-2">
              <Progress value={completeness} className="flex-1" />
              <span className="text-xs font-semibold text-moss-700">
                Perfil {completeness}% completo
              </span>
            </div>
            <p className="text-xs text-sand-500">
              Falta informar: convivencia com gatos, tempo no abrigo.
            </p>
          </section>

          <section className="flex flex-col gap-2 rounded-[14px] border border-sand-100 bg-white p-4">
            <h2 className="text-[13px] font-semibold text-ink">Caes publicados</h2>
            <p className="text-[12.5px] text-slate-450">
              {dogs.filter((d) => d.shelterSlug === "patas-do-ivai").length} caes ativos neste abrigo.
            </p>
          </section>
        </div>
      </form>
    </>
  );
}

function Field({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} placeholder={placeholder} />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <span className="w-24 shrink-0 text-[13px] text-slate-450">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
