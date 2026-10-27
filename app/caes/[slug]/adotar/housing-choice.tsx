"use client";

import { useState } from "react";
import { ChoiceChip } from "@/components/choice-chip";
import { Label } from "@/components/ui/label";

const opcoes = ["Casa com quintal", "Apartamento"];

export function HousingChoice() {
  const [moradia, setMoradia] = useState(opcoes[0]);
  return (
    <div className="flex flex-col gap-2">
      <Label>Tipo de moradia</Label>
      <input type="hidden" name="moradia" value={moradia} />
      <div className="flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <ChoiceChip key={o} selected={moradia === o} onClick={() => setMoradia(o)}>
            {o}
          </ChoiceChip>
        ))}
      </div>
    </div>
  );
}
