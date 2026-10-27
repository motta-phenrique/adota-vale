import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PhotoSlot } from "@/components/photo-slot";
import { AppHeader } from "@/components/app-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getDog } from "@/lib/data/dogs";
import { getShelter } from "@/lib/data/shelters";
import { sizeLabel } from "@/lib/match";

const favoritos = [
  { slug: "pipoca", status: { label: "Solicitacao em analise", tone: "coral" as const } },
  { slug: "aurora", status: null },
  { slug: "nino", status: { label: "Abrigo respondeu", tone: "moss" as const } },
  { slug: "tico", status: { label: "Ja foi adotado", tone: "outline" as const } },
];

export default function FavoritosPage() {
  const items = favoritos.map((f) => ({ ...f, dog: getDog(f.slug)! })).filter((f) => f.dog);
  const pedidos = items.filter((i) => i.status && i.status.tone !== "outline");

  return (
    <div className="flex flex-col">
      <AppHeader title="Favoritos" />
      <Tabs defaultValue="salvos" className="px-5">
        <TabsList>
          <TabsTrigger value="salvos">Salvos ({items.length})</TabsTrigger>
          <TabsTrigger value="pedidos">Solicitacoes ({pedidos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="salvos">
          <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3">
            {items.map((item) => (
              <li key={item.slug}>
                <FavoriteRow item={item} />
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="pedidos">
          <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3">
            {pedidos.map((item) => (
              <li key={item.slug}>
                <FavoriteRow item={item} />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type Item = (typeof favoritos)[number] & { dog: NonNullable<ReturnType<typeof getDog>> };

function FavoriteRow({ item }: { item: Item }) {
  const { dog, status } = item;
  const shelter = getShelter(dog.shelterSlug);
  const dimmed = status?.tone === "outline";
  return (
    <Link
      href={"/caes/" + dog.slug}
      className={
        "flex h-full gap-3 rounded-[18px] border border-sand-100 bg-white p-2.5 transition-colors hover:border-sand-300 " +
        (dimmed ? "opacity-60" : "")
      }
    >
      <PhotoSlot tone={dog.photoTone} sizes="78px" className="h-[78px] w-[78px] shrink-0 rounded-xl" label="" />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-ink">{dog.name}</span>
          <Heart className="h-4 w-4 fill-coral text-coral" />
        </div>
        <span className="text-xs text-slate-450">
          {dog.breed} &middot; {sizeLabel[dog.size].toLowerCase()} &middot; {dog.ageYears} anos
        </span>
        {status ? (
          <Badge variant={status.tone} className="self-start">
            {status.label}
          </Badge>
        ) : (
          <span className="text-[11.5px] text-sand-500">
            {shelter?.name} &middot; {dog.distanceKm} km
          </span>
        )}
      </div>
    </Link>
  );
}
