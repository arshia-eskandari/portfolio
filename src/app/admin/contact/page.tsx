import { H2 } from "../../../components/ui/Typography";
import { getSocials, updateSocials } from "./_action/social";
import ContactForm from "./_components/ContactForm";
import SocialsForm from "./_components/SocialsForm";
import { getContacts, updateContacts } from "./_action/contact";

export default async function AdminContact() {
  const socials = await getSocials();
  const contacts = await getContacts();
  return (
    <div className="">
      <H2>Contact</H2>
      <SocialsForm socials={socials} action={updateSocials} />
      <ContactForm contacts={contacts} action={updateContacts} />
    </div>
  );
}
