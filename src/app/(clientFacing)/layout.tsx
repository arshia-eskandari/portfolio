import Footer from "@/components/ui/Footer";
import { NavLink } from "@/components/ui/NavLink";
import Navbar from "@/components/ui/Navbar";
import Nav from "./_components/Nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
