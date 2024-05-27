"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <nav
      className={cn(
        "flex flex-col justify-start",
        "h-full w-80",
        "bg-primary px-4 pt-6 text-primary-foreground",
      )}
    >
      {children}
    </nav>
  );
}

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  icon: React.ReactNode;
}

export function NavLink({ icon, ...props }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "focus-visible:bg-secondary focus-visible:text-secondary",
        "hover:bg-secondary hover:text-secondary-foreground",
        "flex items-center rounded-sm p-4",
        pathname === props.href && "bg-background text-foreground", // Fixed comparison
      )}
    >
      {icon}
      <Link {...props} />
    </div>
  );
}

interface DropdownProps {
  icon: React.ReactNode;
  label: string;
  children: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  icon,
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState<string>("");

  const toggleDropdown = () => {
    if (isOpen) {
      setAnimation("collapse");
      setTimeout(() => setIsOpen(false), 100);
    } else {
      setIsOpen(true);
      setAnimation("expand");
      setTimeout(() => setIsOpen(true), 200);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={cn(
          "flex w-full items-center justify-between",
          "rounded-sm p-4",
          "bg-primary text-primary-foreground",
          "hover:bg-secondary hover:text-secondary-foreground",
        )}
      >
        <div className="flex items-center">
          {icon}
          {label}
        </div>
        <ChevronDown
          className={cn("transition-transform duration-100", {
            "rotate-180 transform": isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className={cn(`overflow-hidden ${animation} pl-6`)}>
          {children}
        </div>
      )}
    </div>
  );
};
