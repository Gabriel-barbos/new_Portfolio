import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// Import integration images
import excelIcon from "../../assets/icons/excel.png";
import agendaIcon from "../../assets/icons/agendaa.png";
import mercadoPagoIcon from "../../assets/icons/mercado_Pago.png";
import claudeIcon from "../../assets/icons/claude.png";
import teamsIcon from "../../assets/icons/teams.png";
import telegramIcon from "../../assets/icons/telegram.png";

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200/80 bg-white p-2.5 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:border-neutral-800 dark:bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl bg-transparent p-10",
        className,
      )}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-xs md:max-w-md">
        <div className="flex flex-col justify-between">
          <Circle ref={div1Ref}>
            <img src={agendaIcon} alt="Agenda" className="h-full w-full object-contain" />
          </Circle>
          <Circle ref={div2Ref}>
            <img src={mercadoPagoIcon} alt="Mercado Pago" className="h-full w-full object-contain scale-110" />
          </Circle>
          <Circle ref={div3Ref}>
            <img src={excelIcon} alt="Excel" className="h-full w-full object-contain" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div4Ref} className="h-16 w-16 bg-neutral-950 border-neutral-800/80 dark:bg-neutral-950 dark:border-neutral-800/80 shadow-[0_0_20px_rgba(37,99,235,0.25)]">
            <div className="relative flex items-center justify-center leading-none select-none">
              <span className="text-xl font-extrabold tracking-[-0.07em] text-white">
                G
              </span>
              <span className="relative ml-[-0.04em] text-xl font-extrabold tracking-[-0.05em] text-white">
                7
                <span
                  className="absolute bottom-[0.14em] right-[-0.06em] w-[0.12em] h-[0.45em] rounded-[0.5px] bg-blue-600 skew-x-[-12deg] shadow-[0_0_8px_rgba(37,99,235,0.7)]"
                  aria-hidden
                />
              </span>
            </div>
          </Circle>
        </div>
        <div className="flex flex-col justify-between">
          <Circle ref={div5Ref}>
            <img src={claudeIcon} alt="Claude AI" className="h-full w-full object-contain" />
          </Circle>
          <Circle ref={div6Ref}>
            <img src={teamsIcon} alt="Microsoft Teams" className="h-full w-full object-contain" />
          </Circle>
          <Circle ref={div7Ref}>
            <img src={telegramIcon} alt="Telegram" className="h-full w-full object-contain" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div7Ref}
      />
    </div>
  );
}

export default AnimatedBeamMultipleOutputDemo;
