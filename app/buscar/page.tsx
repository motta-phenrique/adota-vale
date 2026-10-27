import { SearchView } from "./search-view";
import { dogs } from "@/lib/data/dogs";
import { defaultPreferences } from "@/lib/data/preferences";

export default function BuscarPage() {
  return <SearchView dogs={dogs} initialPrefs={defaultPreferences} />;
}
