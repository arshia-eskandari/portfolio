"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "./Button";

export interface InputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  items: T[];
  itemsClassName?: string;
  itemClickHandler: (item: T) => void;
}

function InputComponent(
  { className, itemsClassName, items, itemClickHandler, ...props }: InputProps<any>,
  ref: React.Ref<HTMLInputElement>,
) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: Event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const itemRenderer = (item: any) => {
    const { name, id } = item;
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          itemClickHandler(item);
        }}
        key={id}
        className="flex w-full items-center justify-between border-b bg-background p-2 text-black hover:bg-background"
      >
        <span className="inline-block pr-3">{name}</span>
        <Plus className="inline-block pr-3" />
      </Button>
    );
  };

  return (
    <div ref={wrapperRef}>
      <Input
        ref={ref}
        type="text"
        onFocus={() => {
          setDropdownOpen(true);
        }}
        onChange={(e) => setSearch(e.currentTarget.value)}
        className={cn("w-full lg:w-1/3", className)}
        value={search}
        {...props}
      />
      {dropdownOpen && (
        <div
          className={cn(
            ".expand .collapse absolute mt-[2px] cursor-pointer rounded-sm border-[2px] bg-background p-3 ring-1 md:w-auto",
            dropdownOpen ? "opacity-100" : "opacity-0",
            itemsClassName,
          )}
        >
          {items?.length ? (
            items.map(itemRenderer)
          ) : (
            <div className="p-[10px]">No items available</div>
          )}
        </div>
      )}
    </div>
  );
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps<any>>(
  InputComponent,
);

export { SearchInput };
