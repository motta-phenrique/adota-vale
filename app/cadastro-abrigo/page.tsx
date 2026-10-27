import Link from "next/link";
import { Diamond, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PhotoSlot } from "@/components/photo-slot";
import { ShelterTypeChoice } from "./shelter-type-choice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const etapas = [
  { n: 1, title: "Dados da organizacao", hint: "CNPJ ou registro de associacao" },
  { n: 2, title: "Responsavel e contato", hint: "Quem fala com os adotantes" },
  { n: 3, title: "Verificacao", hint: "Analise em ate 48h" },
];

export default function CadastroAbrigoPage() {
  return (
    <div className="mx-auto grid min-h-dvh w-full max-w-[1080px] grid-cols-1 overflow-hidden border-sand-300 bg-sand-50 lg:my-8 lg:grid-cols-[316px_1fr] lg:rounded-2xl lg:border">
      <aside className="flex flex-col gap-6 bg-petrol px-8 py-9 text-petrol-200">
        <div className="flex items-center gap-2.5">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-coral text-white">
            <Diamond className="h-3.5 w-3.5" />
          </span>
          <span className="text-[15px] font-semibold text-sand-50">Adota Vale</span>
        </div>
        <h1 className="font-serif text-[32px] leading-[1.15] text-sand-50">Cadastre seu abrigo na rede</h1>
        <p className="text-[13.5px] leading-relaxed">
          Sem custo. Depois da aprovacao voce publica seus caes e recebe solicitacoes de adotantes ja
          filtrados por perfil.
        </p>
        <ol className="mt-2 flex flex-col gap-4">
          {etapas.map((e) => (
            <li key={e.n} className="flex items-start gap-3">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] text-sand-50">
                {e.n}
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-sand-50">{e.title}</span>
                <span className="block text-xs">{e.hint}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-auto text-xs">Duvidas? contato@adotavale.org</p>
      </aside>

      <div className="flex flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-100 bg-white px-8 py-5">
          <div>
            <h2 className="font-serif text-2xl text-ink">Dados do abrigo</h2>
            <p className="mt-0.5 text-[12.5px] text-sand-600">Etapa 1 de 3</p>
          </div>
          <div className="flex w-40 gap-1.5" role="progressbar" aria-valuenow={1} aria-valuemax={3}>
            <span className="h-1 flex-1 rounded-full bg-petrol" />
            <span className="h-1 flex-1 rounded-full bg-sand-200" />
            <span className="h-1 flex-1 rounded-full bg-sand-200" />
          </div>
        </header>

        <form className="flex flex-1 flex-col gap-6 px-8 py-6">
          <section className="flex flex-col gap-3">
            <h3 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Organizacao</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="abrigo">Nome do abrigo</Label>
                <Input id="abrigo" name="abrigo" placeholder="Lar Amigo Fiel" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cnpj">CNPJ (opcional para protetores)</Label>
                <Input id="cnpj" name="cnpj" inputMode="numeric" placeholder="18.402.771/0001-05" />
              </div>
              <ShelterTypeChoice />
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="caes">Caes sob cuidado hoje</Label>
                <Input id="caes" name="caes" type="number" min={0} placeholder="24" />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">
              Endereco e atendimento
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label htmlFor="rua">Rua e numero</Label>
                <Input id="rua" name="rua" placeholder="Av. Getulio Vargas, 1.480" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cidade">Cidade</Label>
                <Select name="cidade" defaultValue="Jandaia do Sul">
                  <SelectTrigger id="cidade">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Ivaipora", "Jandaia do Sul", "Apucarana", "Faxinal"].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="resp">Responsavel</Label>
                <Input id="resp" name="responsavel" placeholder="Sonia Baptista" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="whats">WhatsApp</Label>
                <Input id="whats" name="whatsapp" inputMode="tel" placeholder="(43) 99712-4488" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="visitas">Dias de visita</Label>
                <Select name="visitas" defaultValue="Sab e dom, 9h-15h">
                  <SelectTrigger id="visitas">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Sab e dom, 9h-15h", "Ter a sab, 13h-17h", "Sob agendamento"].map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">
                Documentos para verificacao
              </h3>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-sand-400 bg-white p-4">
                <input type="file" name="documento" accept=".pdf,image/*" className="sr-only" />
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-sand-100 text-sand-600">
                  <Upload className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold text-ink">
                    Enviar estatuto ou comprovante
                  </span>
                  <span className="block text-xs text-sand-600">PDF ou imagem, ate 10 MB</span>
                </span>
              </label>
              <div className="flex items-center gap-2.5 rounded-[10px] border border-sand-100 bg-white px-3 py-2.5">
                <Badge variant="moss">Enviado</Badge>
                <span className="text-[12.5px] text-ink">estatuto-lar-amigo-fiel.pdf</span>
                <button type="button" className="ml-auto text-sand-500" aria-label="Remover arquivo">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 lg:w-[260px]">
              <h3 className="text-[11.5px] uppercase tracking-[0.15em] text-sand-600">Logo do abrigo</h3>
              <PhotoSlot tone={1} label="logo" className="h-[118px] rounded-xl" />
            </div>
          </section>

          <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-sand-100 bg-white px-0 pt-4">
            <p className="text-[12.5px] text-sand-600">
              Ao continuar voce concorda com o termo de parceria da rede.
            </p>
            <div className="flex gap-2.5">
              <Button type="button" variant="outline">
                Salvar e sair
              </Button>
              <Button asChild>
                <Link href="/painel/caes/novo">Continuar</Link>
              </Button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}
