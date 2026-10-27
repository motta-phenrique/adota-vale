import Link from "next/link";
import { Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-petrol lg:max-w-none lg:flex-row lg:items-stretch">
      <div className="flex flex-1 flex-col gap-4 px-7 pt-12 lg:justify-center lg:px-16 lg:pt-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-coral text-white">
          <Diamond className="h-5 w-5" />
        </div>
        <h1 className="font-serif text-[40px] leading-[1.05] text-sand-50 lg:text-[64px]">
          Um lar
          <br />
          perto de casa.
        </h1>
        <p className="max-w-sm text-[14.5px] leading-relaxed text-petrol-200">
          Caes de 9 abrigos do Vale do Ivai, reunidos em um so lugar. Diga o que voce procura e a gente
          sugere.
        </p>
      </div>

      <form className="flex flex-col gap-3 rounded-t-[28px] bg-sand-50 px-6 pb-8 pt-7 lg:w-[460px] lg:shrink-0 lg:justify-center lg:rounded-none lg:px-12 lg:py-16">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail ou celular</Label>
          <Input id="email" name="email" type="text" placeholder="marina@email.com" autoComplete="username" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" name="senha" type="password" placeholder="Sua senha" autoComplete="current-password" />
        </div>
        <Button className="mt-1 w-full" size="lg" type="submit">
          Entrar
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href="/cadastro">Criar conta de adotante</Link>
        </Button>
        <p className="mt-1.5 text-center text-[12.5px] text-sand-600">
          Sou um abrigo &middot;{" "}
          <Link href="/cadastro-abrigo" className="font-semibold">
            Acessar painel
          </Link>
        </p>
      </form>
    </div>
  );
}
