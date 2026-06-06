import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-7 text-sm font-semibold transition-all";

const variants = {
  primary:
    "border border-amber-300/70 bg-amber-300 text-zinc-950 shadow-lg shadow-amber-300/15 hover:bg-teal-200 hover:shadow-teal-300/20",
  outline:
    "border border-teal-200/35 bg-slate-950/40 text-white hover:border-amber-200/70 hover:bg-white/[0.08] hover:text-amber-100",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
