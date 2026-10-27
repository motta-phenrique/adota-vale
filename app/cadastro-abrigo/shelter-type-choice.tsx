"use client";

import { useState } from "react";
import { ChoiceChip } from "@/components/choice-chip";
import { Label } from "@/components/ui/label";

const tipos = ["ONG / associacao", "Protetor independente"];

export function ShelterTypeChoice() {
  const [tipo, setTipo] = useState(tipos[0]);
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Tipo</Label>
      <input type="hidden" name="tipo" value={tipo} />
      <div className="flex flex-wrap gap-2">
        {tipos.map((t) => (
          <ChoiceChip key={t} selected={tipo === t} onClick={() => setTipo(t)}>
            {t}
          </ChoiceChip>
        ))}
      </div>
    </div>
  );
}
