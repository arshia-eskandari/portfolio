import Footer from "@/components/ui/Footer";
import Nav from "./_components/Nav";
import Socials from "@/components/ui/Socials";
import { getClientSocials } from "./_actions/socials";
import "highlight.js/styles/atom-one-dark.css";
export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socials = await getClientSocials();
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <Socials socials={socials} />
      {children}
      <Footer />
    </div>
  );
}
