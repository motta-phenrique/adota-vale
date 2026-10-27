import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PhotoSlot } from "@/components/photo-slot";
import { HousingChoice } from "./housing-choice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dogs, getDog } from "@/lib/data/dogs";
import { getShelter } from "@/lib/data/shelters";

export function generateStaticParams() {
  return dogs.map((d) => ({ slug: d.slug }));
}

export default async function AdotarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dog = getDog(slug);
  if (!dog) notFound();
  const shelter = getShelter(dog.shelterSlug);

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-sand-50 lg:max-w-[680px] lg:py-6">
      <div className="flex flex-col gap-3.5 px-6 pb-3 pt-6 lg:px-10">
        <div className="flex items-center justify-between text-[13px] text-slate-450">
          <Link href={"/caes/" + dog.slug} aria-label="Voltar">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span>Etapa 3 de 4</span>
          <span className="w-5" />
        </div>
        <div className="flex items-center gap-3 rounded-[14px] border border-sand-100 bg-white p-2.5">
          <PhotoSlot tone={dog.photoTone} sizes="44px" className="h-11 w-11 rounded-[10px]" label="" />
          <div>
            <p className="text-sm font-semibold text-ink">Adocao de {dog.name}</p>
            <p className="text-[11.5px] text-sand-600">{shelter?.name}</p>
          </div>
        </div>
        <h1 className="font-serif text-[27px] leading-tight text-ink lg:text-[36px]">Sobre a sua casa</h1>
      </div>

      <form className="flex flex-1 flex-col gap-4 px-6 lg:px-10">
        <HousingChoice />

        <div className="flex flex-col gap-2">
          <Label htmlFor="pessoas">Quantas pessoas moram com voce?</Label>
          <Select name="pessoas" defaultValue="3 pessoas, 1 crianca">
            <SelectTrigger id="pessoas">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Moro sozinho", "2 pessoas", "3 pessoas, 1 crianca", "4 pessoas ou mais"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="animais">Ja tem outros animais?</Label>
          <Select name="animais" defaultValue="Sim, 1 gato castrado">
            <SelectTrigger id="animais">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Nao", "Sim, 1 gato castrado", "Sim, 1 cao", "Sim, mais de dois"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="motivo">Por que voce quer adotar {dog.name}?</Label>
          <Textarea
            id="motivo"
            name="motivo"
            placeholder="Conte um pouco da sua rotina e do espaco que voce tem."
          />
        </div>

        <label className="flex items-start gap-2.5 rounded-xl border border-sand-100 bg-white p-3">
          <Checkbox name="termo" defaultChecked className="mt-0.5" />
          <span className="text-xs leading-relaxed text-slate-450">
            Aceito receber uma visita do abrigo e assinar o termo de adocao responsavel.
          </span>
        </label>

        <div className="mt-auto border-t border-sand-100 pb-6 pt-3.5 lg:mt-10">
          <Button asChild size="lg" className="w-full">
            <Link href="/favoritos">Enviar solicitacao</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
