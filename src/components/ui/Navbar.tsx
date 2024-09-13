"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import Logo from "@/assets/Logo2Mobile";

export default function Navbar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!isOpen) {
      timer = setTimeout(() => {
        setHidden(false);
      }, 500);
    } else {
      setHidden(true);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "relative z-[1000] flex w-full flex-col bg-primary p-3 px-4 text-primary-foreground",
        "md:flex-row md:items-center md:justify-between",
        "transition-all duration-300 ease-in-out",
        isOpen ? "h-auto py-3" : "h-[72px] py-3",
      )}
    >
      <div className="flex w-full items-center justify-between">
        <button className="flex h-[48px] w-[48px] items-center justify-center">
          <Logo />
        </button>
        <button
          className={cn(
            "flex h-12 w-12 items-center justify-center",
            "rounded bg-gray-200 p-2 text-foreground md:hidden",
            "relative overflow-hidden",
          )}
          onClick={toggleNavbar}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
            style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
          >
            {isOpen ? (
              <X
                className="transition-opacity duration-300"
                style={{ opacity: isOpen ? 1 : 0 }}
              />
            ) : (
              <Menu
                className="transition-opacity duration-300"
                style={{ opacity: isOpen ? 0 : 1 }}
              />
            )}
          </div>
        </button>
        <div
          className={cn(
            "hidden transition-all duration-500 ease-in-out md:flex md:flex-row md:justify-between",
          )}
        >
          {children}
        </div>
      </div>

      {hidden && (
        <div
          onClick={(e) => {
            setIsOpen(false);
          }}
          className={cn(
            "absolute left-0 right-0 top-0 flex w-full translate-y-[60px]",
            "flex-col bg-primary p-3 transition-all duration-500 ease-in-out md:hidden",
            isOpen
              ? "opacity-1 max-h-screen"
              : "max-h-0 overflow-hidden opacity-0",
          )}
        >
          {children}
        </div>
      )}
    </nav>
  );
}
