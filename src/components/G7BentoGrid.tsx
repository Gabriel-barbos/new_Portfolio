import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons"
import { BellIcon, Share2Icon, ShieldCheck, Cloud } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/animated-beam-multiple-outputs"
import { AnimatedListDemo } from "@/components/ui/animated-list-demo"
import { BentoCard, BentoGrid as MagicBentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"
import { SectionHeader } from "./SectionHeader"
import { SecuritySkeleton } from "@/components/cards-demo-3"
import WorldMap from "@/components/ui/world-map"

const mapDots = [
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: 40.7128, lng: -74.0060 }, // New York
  },
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },
  {
    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    end: { lat: -33.8688, lng: 151.2093 }, // Sydney
  },
]

const files = [
  {
    name: "contrato.pdf",
    body: "Contrato de prestação de serviços referentes ao projeto.",
  },
  {
    name: "finances.xlsx",
    body: "Planilha com o resumo financeiro do projeto.",
  },
  {
    name: "cronograma.xlsx",
    body: "Planilha com o cronograma do projeto.",
  },
  {
    name: "diagrama.png",
    body: "Diagrama de fluxo para o desenvolvimento do projeto.",
  },
  {
    name: "requisitos.md",
    body: "Documento com os requisitos do projeto.",
  },
]

const features = [
  {
    Icon: FileTextIcon,
    name: "Sistemas com relatórios completos",
    description: "Obtenha relatórios completos para as melhores tomadas de decisão.",
    href: "#",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-1",
    accentGlow: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
    iconColor: "text-blue-400/80 group-hover:text-blue-400",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-white/10 bg-neutral-900/40 hover:bg-neutral-800/60",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium text-neutral-200">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs text-neutral-400">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Sistemas em Tempo Real",
    description: "Tenha sistemas com atualizações e sincronização em tempo real.",
    href: "#",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-2",
    accentGlow: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    iconColor: "text-emerald-400/80 group-hover:text-emerald-400",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrações",
    description: "Um sistema que se conecta com as principais ferramentas do mercado.",
    href: "#",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-2",
    accentGlow: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    iconColor: "text-purple-400/80 group-hover:text-purple-400",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Agendamentos",
    description: "Integre seu negocio com as ferramentas de agendamento e cronograma",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Saiba mais",
    accentGlow: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    iconColor: "text-amber-400/80 group-hover:text-amber-400",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
  {
    Icon: ShieldCheck,
    name: "Segurança e Controle de Acesso",
    description: "Mantenha sua infraestrutura protegida com autenticação moderna, criptografia de ponta a ponta e controle granular.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Saiba mais",
    accentGlow: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    iconColor: "text-cyan-400/80 group-hover:text-cyan-400",
    background: (
      <div className="absolute inset-0 origin-center scale-90 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-95">
        <SecuritySkeleton />
      </div>
    ),
  },
  {
    Icon: Cloud,
    name: "Aplicações, Storage e Backup em Cloud",
    description: "Hospedagem, storage redundante e rotinas automáticas de backup em nuvem com alta escalabilidade.",
    className: "col-span-3 lg:col-span-2",
    href: "#",
    cta: "Saiba mais",
    accentGlow: "hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    iconColor: "text-indigo-400/80 group-hover:text-indigo-400",
    background: (
      <div className="absolute inset-0 top-10 w-full opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] transition-all duration-300 ease-out group-hover:scale-105">
        <WorldMap dots={mapDots} lineColor="#2563EB" />
      </div>
    ),
  },
]

export function G7BentoGrid() {
  return (
    <section className="relative bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-6 max-w-5xl mx-auto">
          {/* Glassmorphic Container Wrapper */}
          <div className="relative rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-5 sm:p-7 shadow-2xl overflow-hidden">
            {/* Soft Ambient Glow Orbs inside container */}
            <div className="absolute -top-28 -left-28 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -right-28 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <MagicBentoGrid>
                {features.map((feature, idx) => (
                  <BentoCard key={idx} {...feature} />
                ))}
              </MagicBentoGrid>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default G7BentoGrid;
