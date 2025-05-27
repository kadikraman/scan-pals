import type { ComponentProps } from "react";

import { cn } from "@/src/utils/cn";

export function Input({ type, className, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      {...props}
      className={cn(
        "flex p-3 w-full rounded-md border text-base transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-light-border bg-light-background text-light-textPrimary focus-visible:border-gray-400",
        "dark:border-dark-border dark:bg-dark-background dark:text-dark-textPrimary dark:focus-visible:border-slate-500",
        className,
      )}
    />
  );
}
