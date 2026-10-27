import { SuggestionsView } from "./suggestions-view";
import { dogs } from "@/lib/data/dogs";
import { defaultPreferences } from "@/lib/data/preferences";
import { rankDogs } from "@/lib/match";

export default function SugestoesPage() {
  const ranked = rankDogs(dogs, defaultPreferences);
  return <SuggestionsView ranked={ranked} prefs={defaultPreferences} />;
}
