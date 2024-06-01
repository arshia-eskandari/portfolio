import { H2 } from "../../../components/ui/Typography";
import { getSocials, updateSocials } from "./_action/social";
import ContactForm from "./_components/ContactForm";
import SocialsForm from "./_components/SocialsForm";

export default async function AdminContact() {
  const socials = await getSocials();
  return (
    <div className="">
      <H2>Contact</H2>
      <SocialsForm socials={socials} action={updateSocials} />
      <ContactForm contacts={[]} action={async () => {"use server"}} />
    </div>
  );
}
