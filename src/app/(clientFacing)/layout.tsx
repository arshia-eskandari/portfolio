import Footer from "@/components/ui/Footer";
import { NavLink } from "@/components/ui/NavLink";
import Navbar from "@/components/ui/Navbar";
import Nav from "./_components/Nav";
import Socials from "@/components/ui/Socials";
import { getSocials } from "./_actions/socials";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socials = await getSocials();
  return (
    <>
      <Nav />
      <Socials socials={socials} />
      {children}
      <Footer />
    </>
  );
}
