import { NavLink } from "@/components/ui/NavLink";
import Navbar from "@/components/ui/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#experiences">Experiences</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#contact" variant="inverted">Contact</NavLink>
      </Navbar>
      {children}
    </>
  );
}
