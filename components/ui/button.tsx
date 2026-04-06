import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex max-w-full shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] text-primary-foreground shadow-[0_18px_36px_rgba(27,28,25,0.09)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_22px_44px_rgba(27,28,25,0.12)] [a]:hover:brightness-105",
        outline:
          "border-[color:var(--ghost-border)] bg-white/82 text-foreground shadow-[0_12px_28px_rgba(27,28,25,0.05)] hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground aria-expanded:bg-secondary aria-expanded:text-foreground",
        outlineInverse:
          "border-white/12 bg-white/8 text-[rgba(255,249,241,0.94)] shadow-none hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/12 hover:text-white focus-visible:border-white/20 focus-visible:ring-white/12",
        secondary:
          "border-[color:var(--ghost-border)] bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-[color:var(--surface-strong)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-secondary hover:text-foreground aria-expanded:bg-secondary aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/14 focus-visible:border-destructive/30 focus-visible:ring-destructive/15",
        link: "px-0 text-primary underline-offset-4 hover:text-foreground hover:underline",
        linkInverse:
          "px-0 text-[rgba(247,241,231,0.8)] underline-offset-4 hover:text-white hover:underline focus-visible:border-white/20 focus-visible:ring-white/12",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 text-[0.76rem] tracking-[0.18em] uppercase has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-full px-2.5 text-[0.62rem] tracking-[0.18em] uppercase in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-full px-3.5 text-[0.66rem] tracking-[0.18em] uppercase in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-5 text-[0.74rem] tracking-[0.22em] uppercase has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-8",
        "icon-xs": "size-6 rounded-full in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-full in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
