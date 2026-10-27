import { cn } from "@/lib/utils";

export function MatchBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn("whitespace-nowrap text-xs font-semibold text-coral", className)}>
      {score}% combina
    </span>
  );
}

export function MatchTile({ score }: { score: number }) {
  return (
    <div className="rounded-xl border border-coral-200 bg-coral-50 px-2.5 py-2 text-center">
      <div className="text-[17px] font-bold leading-none text-coral">{score}%</div>
      <div className="mt-1 text-[9.5px] uppercase tracking-wider text-coral-700">combina</div>
    </div>
  );
}
