import Link from "next/link";
import { ChevronRight, LogOut, Pencil } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultPreferences } from "@/lib/data/preferences";
import { ageLabel, coatLabel, sizeLabel, sexLabel } from "@/lib/match";

const cidades = ["Ivaipora", "Jandaia do Sul", "Apucarana", "Faxinal", "Jardim Alegre", "Manoel Ribas"];

const avisos = [
  { name: "novos", label: "Caes novos que combinam comigo", hint: "No maximo um aviso por dia", on: true },
  { name: "respostas", label: "Respostas dos abrigos", hint: "Quando um abrigo responde sua solicitacao", on: true },
  { name: "lembretes", label: "Lembretes de visita", hint: "Um dia antes da visita agendada", on: false },
];

export default function PerfilPage() {
  const p = defaultPreferences;
  // Resumo das preferencias; a edicao de verdade vive no /onboarding.
  const resumo = [
    ...p.sizes.map((s) => "Porte " + sizeLabel[s].toLowerCase()),
    ...p.coats.map((c) => coatLabel[c]),
    ...p.ages.map((a) => ageLabel[a]),
    ...p.sexes.map((s) => sexLabel[s]),
    p.energy < 0.4 ? "Calmo" : p.energy < 0.7 ? "Energia media" : "Ativo",
    "Ate " + p.maxDistanceKm + " km",
    ...(p.goodWithKids ? ["Bom com criancas"] : []),
    ...(p.goodWithPets ? ["Bom com outros animais"] : []),
  ];

  return (
    <div className="flex flex-col lg:max-w-3xl">
      <AppHeader
        title="Seu perfil"
        action={
          <Button variant="ghost" size="sm" className="text-slate-450">
            <LogOut className="h-3.5 w-3.5" />
            Sair
          </Button>
        }
      />

      <div className="flex flex-col gap-5 px-5">
        <section className="flex items-center gap-3.5 rounded-2xl border border-sand-100 bg-white p-4">
          <span className="h-[62px] w-[62px] shrink-0 rounded-full bg-sand-300" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-ink">Marina Ferreira Lima</p>
            <p className="truncate text-[12.5px] text-slate-450">marina@email.com</p>
            <p className="text-[11.5px] text-sand-500">Ivaipora, PR &middot; na rede desde 2025</p>
          </div>
          <Button variant="outline" size="icon" aria-label="Trocar foto">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </section>

        <dl className="grid grid-cols-3 gap-2.5">
          <Stat label="favoritos" value={4} />
          <Stat label="solicitacoes" value={2} />
          <Stat label="visitas" value={1} />
        </dl>

        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">
              Suas preferencias
            </h2>
            <Link href="/onboarding" className="text-[12.5px] font-semibold text-coral">
              Editar
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 rounded-2xl border border-sand-100 bg-white p-3.5">
            {resumo.map((r) => (
              <Badge key={r} variant="outline" className="px-2.5 py-1.5 text-xs">
                {r}
              </Badge>
            ))}
          </div>
          <p className="text-[11.5px] leading-relaxed text-sand-500">
            Sao esses filtros que montam a sua lista de sugestoes.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">Dados da conta</h2>
          <form className="flex flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" name="nome" defaultValue="Marina Ferreira Lima" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" defaultValue="marina@email.com" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tel">Celular / WhatsApp</Label>
              <Input id="tel" name="telefone" inputMode="tel" defaultValue="(43) 99814-2207" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cidade">Cidade</Label>
              <Select name="cidade" defaultValue="Ivaipora">
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
          </form>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">Avisos</h2>
          <div className="flex flex-col divide-y divide-sand-100 rounded-2xl border border-sand-100 bg-white px-3.5">
            {avisos.map((a) => (
              <label key={a.name} className="flex min-h-[58px] items-center justify-between gap-3 py-2.5">
                <span className="min-w-0">
                  <span className="block text-sm text-ink">{a.label}</span>
                  <span className="block text-[11.5px] text-sand-500">{a.hint}</span>
                </span>
                <Switch name={a.name} defaultChecked={a.on} />
              </label>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-[11.5px] uppercase tracking-[0.14em] text-sand-600">Conta</h2>
          <div className="flex flex-col divide-y divide-sand-100 overflow-hidden rounded-2xl border border-sand-100 bg-white">
            <RowLink href="/cadastro-abrigo" label="Sou um abrigo" hint="Acessar o painel do abrigo" />
            <RowLink href="/favoritos" label="Minhas solicitacoes" hint="2 em andamento" />
            <RowLink href="/login" label="Trocar senha" hint="" />
          </div>
          <Button variant="outline" size="lg" className="mt-1 w-full text-coral lg:w-auto lg:self-start lg:px-8">
            <LogOut className="h-4 w-4" />
            Sair da conta
          </Button>
          <p className="pb-2 text-center text-[11px] text-sand-500 lg:text-left">
            Adota Vale &middot; versao 1.0
          </p>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-sand-100 bg-white p-2.5 text-center">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-lg font-semibold text-ink">{value}</span>
        <span className="block text-[10.5px] text-sand-600">{label}</span>
      </dd>
    </div>
  );
}

function RowLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <Link href={href} className="flex min-h-[54px] items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-sand-50">
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-ink">{label}</span>
        {hint && <span className="block text-[11.5px] text-sand-500">{hint}</span>}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-350" />
    </Link>
  );
}
