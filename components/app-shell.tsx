import { BottomNav } from "@/components/bottom-nav";
import { SideNav } from "@/components/side-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex lg:min-h-dvh lg:items-start">
      <SideNav />
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-sand-50 lg:mx-0 lg:max-w-none lg:flex-1">
        <main className="flex-1 pb-4 lg:mx-auto lg:w-full lg:max-w-[1200px] lg:px-5 lg:pb-12">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
