"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, ArrowLeftIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { cloneElement, useEffect } from "react";
import { ComponentProps, ReactNode, useState } from "react";

export function Sidebar({ children }: { children: ReactNode }) {
  // Define the breakpoint for 'md' (typically 768px for Tailwind CSS)
  const mdBreakpoint = 768;

  // Initialize isOpen based on the initial window width
  const [isOpen, setIsOpen] = useState(true);
  const [md, setMd] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      console.log("called handleResize");
      if (window.innerWidth >= mdBreakpoint) {
        setMd(true);
        setIsOpen(true);
      } else {
        setMd(false);
        setIsOpen(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependencies are empty to set up and tear down the listener once

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // EXPLANATION: The enhanceChildren function applies a closeSidebar
  // click handler to the child and its immediate children.
  // It ensures that all clickable elements within one level
  // deep will close the sidebar when interacted with, preserving
  // existing onClick behaviors.
  const enhanceChildren = (
    child: React.ReactNode,
    index: number,
  ): ReactNode => {
    if (React.isValidElement(child) && index !== 3) {
      // Extend with onClick if possible
      const childProps = child.props as any; // Bypassing strict type checks

      const newChild = cloneElement(child, {
        ...childProps,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          closeSidebar();
          childProps.onClick?.(e); // Call original onClick if it exists
        },
      });

      // Ensure childProps.children is handled correctly
      if (childProps.children && index !== 3) {
        const enhancedGrandchildren = React.Children.map(
          childProps.children,
          (grandchild: ReactNode) => {
            if (React.isValidElement(grandchild)) {
              const grandchildProps = grandchild.props as any; // Bypassing strict type checks

              return cloneElement(grandchild, {
                ...grandchildProps,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                  closeSidebar();
                  grandchildProps.onClick?.(e); // Call original onClick if it exists
                },
              });
            }
            return grandchild;
          },
        );

        // Handle the case where enhancedGrandchildren could be null or undefined
        if (enhancedGrandchildren && enhancedGrandchildren.length) {
          return cloneElement(newChild, {}, ...enhancedGrandchildren);
        }
      }

      return newChild;
    }
    return child;
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    console.log({ isOpen, md });
  }, [isOpen, md]);

  return (
    <nav
      className={cn(
        "z-100 flex h-full flex-col justify-start bg-primary px-4 pt-6 text-primary-foreground",
        isOpen ? "absolute w-full" : "absolute w-20",
        "md:relative md:w-80",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <button
        className="flex h-12 w-12 items-center justify-center self-end rounded bg-gray-200 p-2 text-foreground md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && !md ? (
        <div className="mt-4 flex flex-col">
          {React.Children.map(
            React.Children.toArray(children),
            enhanceChildren,
          )}
        </div>
      ) : md ? (
        <div className="mt-4 flex flex-col">{children}</div>
      ) : null}
    </nav>
  );
}

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  icon: React.ReactNode;
}

export function NavLink({ icon, ...props }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "focus-visible:bg-secondary focus-visible:text-secondary",
        "hover:bg-secondary hover:text-secondary-foreground",
        "flex items-center rounded-sm p-4",
        pathname === props.href && "bg-background text-foreground", // Fixed comparison
      )}
      {...props}
    >
      {icon}
      {props?.children}
    </Link>
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
