import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cidades = ["Ivaipora", "Jandaia do Sul", "Apucarana", "Faxinal", "Jardim Alegre", "Manoel Ribas"];

export default function CadastroPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-sand-50 lg:max-w-[680px] lg:py-6">
      <div className="flex flex-col gap-3 px-6 pb-3 pt-6 lg:px-10">
        <Link href="/login" className="inline-flex h-8 w-8 items-center text-slate-450" aria-label="Voltar">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-[30px] leading-tight text-ink lg:text-[38px]">Criar sua conta</h1>
        <p className="text-[13.5px] leading-relaxed text-slate-450">
          Leva um minuto. Depois voce escolhe suas preferencias de cao.
        </p>
      </div>

      <form className="flex flex-1 flex-col gap-2.5 px-6 lg:flex-none lg:px-10">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nome">Nome completo</Label>
          <Input id="nome" name="nome" placeholder="Marina Ferreira Lima" autoComplete="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="marina@email.com" autoComplete="email" />
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tel">Celular / WhatsApp</Label>
            <Input id="tel" name="telefone" inputMode="tel" placeholder="(43) 99814-2207" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cidade">Cidade</Label>
            <Select name="cidade" defaultValue="Ivaipora">
              <SelectTrigger id="cidade">
                <SelectValue placeholder="Escolha sua cidade" />
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
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" name="senha" type="password" autoComplete="new-password" />
          <div className="mt-0.5 flex items-center gap-2">
            <Progress value={70} className="h-1" />
            <span className="text-[11px] font-semibold text-moss-700">Senha forte</span>
          </div>
        </div>

        <label className="mt-1 flex items-start gap-2.5 rounded-xl border border-sand-100 bg-white p-3">
          <Checkbox name="termos" defaultChecked className="mt-0.5" />
          <span className="text-xs leading-relaxed text-slate-450">
            Li e aceito os termos de uso e a politica de privacidade.
          </span>
        </label>
        <label className="flex items-start gap-2.5 px-0.5">
          <Checkbox name="avisos" className="mt-0.5" />
          <span className="text-xs leading-relaxed text-slate-450">
            Quero avisos quando um cao novo combinar com meu perfil.
          </span>
        </label>

        <div className="my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-sand-200" />
          <span className="text-[11.5px] text-sand-500">ou</span>
          <span className="h-px flex-1 bg-sand-200" />
        </div>
        <div className="flex gap-2.5">
          <Button type="button" variant="outline" className="flex-1">
            Google
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Apple
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-2.5 border-t border-sand-100 pb-7 pt-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/onboarding">Criar conta e continuar</Link>
          </Button>
          <p className="text-center text-[12.5px] text-sand-600">
            Ja tenho conta &middot;{" "}
            <Link href="/login" className="font-semibold">
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
