import React from "react";

interface PrestationLayoutProps {
  children: React.ReactNode;
}

export default function PrestationLayout({ children }: PrestationLayoutProps) {
  return (
    <main className="relative overflow-x-hidden pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-[1]">
        {children}
      </div>
    </main>
  );
}
