"use client";
import { usePathname, useRouter } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import Navbar from "@/components/ui/Navbar";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

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

  // If we're on /articles, show a single "Home" link that navigates back to /
  if (pathname === "/articles") {
    return (
      <Navbar>
        <NavLink
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          Home
        </NavLink>
      </Navbar>
    );
  }

  // Default nav (for / and other routes)
  return (
    <Navbar>
      <NavLink
        href="#projects"
        onClick={(e) => handleScrollToExperience(e, "projects")}
      >
        Projects
      </NavLink>
      <NavLink
        href="#experiences"
        onClick={(e) => handleScrollToExperience(e, "experiences")}
      >
        Experiences
      </NavLink>
      <NavLink
        href="#about"
        onClick={(e) => handleScrollToExperience(e, "about")}
      >
        About
      </NavLink>
      <NavLink
        href="#skills"
        onClick={(e) => handleScrollToExperience(e, "skills")}
      >
        Skills
      </NavLink>
      <NavLink
        href="#contact"
        variant="inverted"
        onClick={(e) => handleScrollToExperience(e, "contact")}
      >
        Contact
      </NavLink>
    </Navbar>
  );
}
