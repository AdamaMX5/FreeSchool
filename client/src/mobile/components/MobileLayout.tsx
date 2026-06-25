import type { ReactNode } from "react";
import LoginSheet from "./LoginMenu";

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-neutral-900 text-neutral-100">
      <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-neutral-700 bg-neutral-800 px-4">
        <span className="text-base font-semibold">FreeSchool</span>
        <LoginSheet />
      </header>
      <main className="px-3 pb-6 pt-16">{children}</main>
    </div>
  );
}
