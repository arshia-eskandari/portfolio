import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  icon?: React.ReactNode;
  variant?: "inverted"
}

export function NavLink({ icon, variant, ...props }: NavLinkProps) {
  return (
    <Link
      className={cn(
        "focus-visible:bg-secondary focus-visible:text-secondary",
        "hover:bg-secondary hover:text-secondary-foreground",
        "flex items-center rounded-sm py-2 px-4 justify-center",
        "md:ml-3 ",
        variant === "inverted" ? "bg-secondary text-secondary-foreground hover:bg-white" : ""
      )}
      {...props}
    >
      {icon}
      {props?.children}
    </Link>
  );
}
