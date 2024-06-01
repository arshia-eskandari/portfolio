import { H2 } from "../../../components/ui/Typography";
import { getSocials, updateSocials } from "./_action/social";
import ContactForm from "./_components/ContactForm";

export default async function AdminContact() {
  const socials = await getSocials();
  return (
    <div className="">
      <H2>Contact</H2>
      <ContactForm socials={socials} action={updateSocials} contacts={[]} />
    </div>
  );
}
