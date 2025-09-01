"use client";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import Navbar from "@/components/ui/Navbar";
import React from "react";

export default function Nav() {
  const pathname = usePathname();

  const isArticlesIndex = pathname === "/articles";
  const isArticleDetail =
    /^\/articles\/[^/]+$/.test(pathname) || /^\/article\/[^/]+$/.test(pathname);

  const handleScrollTo = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const url = new URL(window.location.toString());
    url.hash = id;
    window.history.pushState({}, "", url);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 1) Article detail: show a back button to /articles
  if (isArticleDetail) {
    return (
      <Navbar>
        <NavLink href="/articles">← Back to Articles</NavLink>
      </Navbar>
    );
  }

  // 2) Articles index: keep simple "Home" link (as you had)
  if (isArticlesIndex) {
    return (
      <Navbar>
        <NavLink href="/">Home</NavLink>
      </Navbar>
    );
  }

  // 3) Default (e.g., "/"): show section links + an "Articles" link to /articles
  return (
    <Navbar>
      <NavLink href="#projects" onClick={(e) => handleScrollTo(e, "projects")}>
        Projects
      </NavLink>
      <NavLink
        href="#experiences"
        onClick={(e) => handleScrollTo(e, "experiences")}
      >
        Experiences
      </NavLink>
      <NavLink href="#about" onClick={(e) => handleScrollTo(e, "about")}>
        About
      </NavLink>
      <NavLink href="#skills" onClick={(e) => handleScrollTo(e, "skills")}>
        Skills
      </NavLink>
      <NavLink href="/articles">Articles</NavLink>
      <NavLink
        href="#contact"
        variant="inverted"
        onClick={(e) => handleScrollTo(e, "contact")}
      >
        Contact
      </NavLink>

    </Navbar>
  );
}
