import Footer from "@/components/ui/Footer";
import Nav from "./_components/Nav";
import Socials from "@/components/ui/Socials";
import { getClientSocials } from "./_actions/socials";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socials = await getClientSocials();
  return (
    <>
      <Nav />
      <Socials socials={socials} />
      {children}
      <Footer />
    </>
  );
}
