import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const BadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border text-[10px] sm:text-[11px] font-semibold leading-none transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-800/30",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-900 text-[#FAF6ED] shadow-xs hover:bg-emerald-800",
        secondary:
          "border-[#E6DCCE] bg-[#F5EFE6] text-emerald-950 hover:bg-[#E6DCCE]/60",
        destructive:
          "border-transparent bg-rose-500 text-white shadow-xs hover:bg-rose-600",
        outline: 
          "text-emerald-950 border-[#E6DCCE] bg-[#FDFBF7] hover:bg-[#F5EFE6]",
      },
      size: {
        default: "px-2 py-0.5",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BadgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(BadgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, BadgeVariants }