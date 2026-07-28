import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { UserPlus, CalendarClock, DollarSign, PieChart } from "lucide-react";

interface Item {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  time: string;
}

const notifications: Item[] = [
  {
    name: "Pagamento Recebido",
    description: "Compra confirmada do produto X",
    time: "2 minutos atrás",
    icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
    color: "rgba(16, 185, 129, 0.1)",
  },
  {
    name: "Novo Cliente Cadastrado",
    description: "Cliente cadastrado no sistema de gestão.",
    time: "5 minutos atrás",
    icon: <UserPlus className="h-5 w-5 text-sky-500" />,
    color: "rgba(14, 165, 233, 0.1)",
  },
  {
    name: "Agendamento confirmado para as 18hrs",
    description: "Cliente confirmou presença na reunião.",
    time: "12 minutos atrás",
    icon: <CalendarClock className="h-5 w-5 text-indigo-500" />,
    color: "rgba(99, 102, 241, 0.1)",
  },
  {
    name: "Aumento de 10% nas vendas em relação ao mês passado",
    description: "Relatório gerado com IA.",
    time: "30 minutos atrás",
    icon: <PieChart className="h-5 w-5 text-violet-500" />,
    color: "rgba(139, 92, 246, 0.1)",
  },
];

// Duplicate items to ensure scrolling list
const items = Array.from({ length: 3 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[430px] cursor-pointer overflow-hidden rounded-2xl p-5",
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        "glass-panel bg-neutral-950/60 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          {icon}
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-[15px] font-semibold text-neutral-200 whitespace-pre">
            <span>{name}</span>
            <span className="mx-2 text-neutral-500">·</span>
            <span className="text-xs font-normal text-neutral-400">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-neutral-400 mt-1 leading-normal">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full flex-col p-4 overflow-hidden rounded-xl bg-transparent",
        className
      )}
    >
      <AnimatedList delay={2000}>
        {items.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}

export default AnimatedListDemo;
