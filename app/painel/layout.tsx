import { ShelterSidebar } from "@/components/shelter-sidebar";

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1280px] flex-col overflow-hidden border-sand-300 bg-sand-50 lg:my-8 lg:flex-row lg:rounded-2xl lg:border">
      <ShelterSidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
