"use client";
import { NavLink } from "@/components/ui/NavLink";
import Navbar from "@/components/ui/Navbar";

export default function Nav() {
  const handleScrollToExperience = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault(); // Prevent default anchor behavior
    const url = new URL(window.location.toString()); // Get the current URL
    url.hash = id; // Set the hash to the id
    window.history.pushState({}, "", url); // Update the URL without reloading the page
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
  };

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
