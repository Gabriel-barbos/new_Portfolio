import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
  accentGlow?: string
  iconColor?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  accentGlow = "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
  iconColor = "text-neutral-400 group-hover:text-blue-400",
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      "bg-neutral-950/90 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500 backdrop-blur-md",
      "[box-shadow:0_-20px_80px_-20px_rgba(255,255,255,0.05)_inset]",
      accentGlow,
      className
    )}
    {...props}
  >
    {/* Subtle top border accent glow line */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div>{background}</div>
    <div className="p-5">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className={cn("h-10 w-10 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75", iconColor)} />
        <h3 className="text-xl font-semibold text-neutral-100 group-hover:text-white transition-colors">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0 text-blue-400 hover:text-blue-300"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className="pointer-events-auto p-0 text-blue-400 hover:text-blue-300"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.02]" />
  </div>
)

export { BentoCard, BentoGrid }
