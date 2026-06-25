import type { ReactNode } from "react";
import LoginMenu from "./LoginMenu";

export default function DesktopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-neutral-900 text-neutral-100">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-neutral-700 bg-neutral-800 px-6">
        <span className="text-lg font-semibold tracking-wide">FreeSchool</span>
        <LoginMenu />
      </header>
      <main className="px-8 pb-8 pt-20">{children}</main>
    </div>
  );
}
