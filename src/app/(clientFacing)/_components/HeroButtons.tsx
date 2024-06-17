"use client";
import { cn } from "@/lib/utils";

export default function HeroButtons() {
  const handleScrollToExperience = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const url = new URL(window.location.toString());
    url.hash = id;
    window.history.pushState({}, "", url);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-6">
      <a
        href="#about"
        className={cn(
          "h-10 px-4 py-2 text-sm font-medium mr-3 rounded-md",
          "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
        onClick={(e) => handleScrollToExperience(e, "about")}
      >
        About
      </a>
      <a
        href="#contact"
        className={cn(
          "h-10 px-4 py-2 text-sm font-medium rounded-md",
          "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
        onClick={(e) => handleScrollToExperience(e, "contact")}
      >
        Contact
      </a>
    </div>
  );
}
