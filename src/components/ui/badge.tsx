import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-badge-default-bg text-badge-default-fg border border-line-muted",
        secondary:   "bg-muted-bg text-fg-secondary",
        destructive: "bg-danger-bg text-danger-fg",
        success:     "bg-success-bg text-success-fg",
        warning:     "bg-warning-bg text-warning-fg",
        outline:     "border border-line text-fg-secondary bg-transparent",
        premium:     "bg-invert text-fg-inverse",
        new:         "bg-success-bg text-success-fg",
        sale:        "bg-danger text-fg-inverse",
        info:        "bg-info-bg text-info-fg",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
