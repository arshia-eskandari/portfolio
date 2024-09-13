import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  icon?: React.ReactNode;
  variant?: "inverted";
}

export function NavLink({ icon, variant, ...props }: NavLinkProps) {
  return (
    <Link
      className={cn(
        "animated-button shine focus-visible:bg-secondary focus-visible:text-secondary",
        // "hover:bg-secondary hover:text-secondary-foreground",
        "flex items-center justify-center rounded-2xl px-4 py-2",
        "md:ml-3",
        "transition-colors duration-500",
        variant === "inverted"
          ? "bg-secondary text-secondary-foreground hover:bg-white"
          : "",
      )}
      {...props}
    >
      {icon}
      {props?.children}
    </Link>
  );
}
