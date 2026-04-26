import React from "react";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Optional custom gradient string (e.g. from company theme). Falls back to pink/purple/blue. */
  gradient?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
  className = "",
  containerClassName = "",
  gradient,
}) => {
  const defaultGradient = "linear-gradient(135deg, #db2777, #9333ea, #2563eb)";

  return (
    <div className={`relative group/card ${containerClassName}`}>
      <div
        className={`absolute -inset-0.5 rounded-lg opacity-60 group-hover/card:opacity-90 transition-all duration-700 ease-in-out`}
        style={{
          background: gradient ?? defaultGradient,
          filter: "blur(6px)",
          animation: "gradient-shift 4s ease-in-out infinite alternate",
        }}
      />
      <div className={`relative bg-background/95 backdrop-blur-sm rounded-lg ${className}`}>
        {children}
        <style>{`
          @keyframes gradient-shift {
            0%   { filter: hue-rotate(0deg)  blur(6px); }
            100% { filter: hue-rotate(30deg) blur(4px); }
          }
        `}</style>
      </div>
    </div>
  );
};