import { BadgeCheck, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PhotoSlot } from "@/components/photo-slot";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getShelter } from "@/lib/data/shelters";

const cidades = ["Ivaipora", "Jandaia do Sul", "Apucarana", "Faxinal", "Jardim Alegre", "Manoel Ribas"];
const horarios = ["Sab, 9h-15h", "Sab e dom, 9h-15h", "Ter a sab, 13h-17h", "Sob agendamento"];

const publico = [
  { name: "telefone", label: "Mostrar telefone no perfil publico", on: true },
  { name: "endereco", label: "Mostrar endereco completo", on: false },
  { name: "recebendo", label: "Aceitando novas solicitacoes", on: true },
];

export default function PerfilAbrigoPage() {
  // O painel e sempre do abrigo logado; aqui, o primeiro da lista.
  const shelter = getShelter("patas-do-ivai")!;

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-100 bg-white px-8 py-5">
        <div>
          <h1 className="font-serif text-[26px] text-ink">Perfil do abrigo</h1>
          <p className="mt-0.5 text-[13px] text-sand-600">
            E isso que os adotantes veem na pagina publica do abrigo.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline">Ver pagina publica</Button>
          <Button>Salvar alteracoes</Button>
        </div>
      </header>

      <form className="flex flex-1 flex-col gap-6 px-8 py-6">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex w-full flex-col gap-2 lg:w-[220px]">
            <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Logo</h2>
            <PhotoSlot tone={2} label="logo do abrigo" sizes="220px" className="h-[132px] rounded-xl" />
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-sand-400 bg-white py-2.5 text-[12.5px] text-sand-600">
              <input type="file" name="logo" accept="image/*" className="sr-only" />
              <Upload className="h-3.5 w-3.5" />
              Trocar imagem
            </label>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Identificacao</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nome">Nome do abrigo</Label>
                <Input id="nome" name="nome" defaultValue={shelter.name} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" name="cnpj" inputMode="numeric" defaultValue="18.402.771/0001-05" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-moss/30 bg-moss-50 px-3.5 py-3">
              <BadgeCheck className="h-4 w-4 shrink-0 text-moss-700" />
              <span className="text-[13px] text-moss-700">
                Abrigo verificado desde {shelter.since}
              </span>
              <Badge variant="moss" className="ml-auto">
                {shelter.verified ? "Verificado" : "Em analise"}
              </Badge>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">
            Endereco e atendimento
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label htmlFor="rua">Rua e numero</Label>
              <Input id="rua" name="rua" defaultValue={shelter.address} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cidade">Cidade</Label>
              <Select name="cidade" defaultValue={shelter.city}>
                <SelectTrigger id="cidade">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cidades.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="resp">Responsavel</Label>
              <Input id="resp" name="responsavel" defaultValue="Sonia Baptista" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="whats">WhatsApp</Label>
              <Input id="whats" name="whatsapp" inputMode="tel" defaultValue="(43) 99712-4488" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="visitas">Dias de visita</Label>
              <Select name="visitas" defaultValue={shelter.visitingHours}>
                <SelectTrigger id="visitas">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Sobre o abrigo</h2>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sobre">Texto de apresentacao</Label>
            <Textarea id="sobre" name="sobre" rows={4} defaultValue={shelter.about} />
            <p className="text-[11.5px] text-sand-500">
              Aparece logo abaixo do nome na pagina publica.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Numeros</h2>
          <dl className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            <Stat label="caes disponiveis" value={shelter.dogsAvailable} />
            <Stat label="adocoes concluidas" value={shelter.adoptions} />
            <Stat label="solicitacoes abertas" value={7} />
            <Stat label="desde" value={shelter.since} />
          </dl>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Visibilidade</h2>
          <div className="flex flex-col divide-y divide-sand-100 rounded-xl border border-sand-100 bg-white px-3.5">
            {publico.map((o) => (
              <label key={o.name} className="flex min-h-[52px] items-center justify-between gap-3 py-2">
                <span className="text-sm text-ink">{o.label}</span>
                <Switch name={o.name} defaultChecked={o.on} />
              </label>
            ))}
          </div>
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-sand-100 pt-4">
          <p className="text-[12.5px] text-sand-600">Ultima atualizacao em 12/09/2026.</p>
          <div className="flex gap-2.5">
            <Button type="button" variant="outline">
              Descartar
            </Button>
            <Button type="submit">Salvar alteracoes</Button>
          </div>
        </footer>
      </form>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-sand-100 bg-white p-3">
      <dd className="text-[22px] font-semibold leading-tight text-ink">{value}</dd>
      <dt className="text-[11.5px] text-sand-600">{label}</dt>
    </div>
  );
}
