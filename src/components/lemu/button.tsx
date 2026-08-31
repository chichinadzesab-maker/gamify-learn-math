import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const lemuButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink font-display font-medium tracking-tight select-none press disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        ink: "bg-ink text-primary-foreground shadow-ink",
        signal: "bg-signal text-signal-foreground shadow-ink",
        blueprint: "bg-blueprint text-blueprint-foreground shadow-ink",
        paper: "bg-chalk text-ink shadow-ink",
        ghost:
          "border-transparent bg-transparent text-ink shadow-none hover:bg-secondary hover:translate-0 hover:shadow-none",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "ink", size: "md" },
  },
);

type Variants = VariantProps<typeof lemuButtonVariants>;

export function LemuButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return (
    <button className={cn(lemuButtonVariants({ variant, size }), className)} {...props} />
  );
}

export function LemuLinkButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(lemuButtonVariants({ variant, size }), className)} {...props} />;
}

export function LemuAnchorButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & Variants) {
  return <a className={cn(lemuButtonVariants({ variant, size }), className)} {...props} />;
}
