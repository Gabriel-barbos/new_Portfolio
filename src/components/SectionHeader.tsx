import React from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-g7-panel text-xs text-blue-400 font-medium border border-blue-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-neutral-400 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
