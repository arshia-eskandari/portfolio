import { H2, H4, P } from "@/components/ui/Typography";
import { getUser } from "./_actions/jwt";
import { capitalizeFirstLetter } from "@/lib/string";
import { Mail } from "lucide-react";
import { getPendingContacts } from "./_actions/contact";
import Link from "next/link";

export default async function AdminDashboard() {
  const user = await getUser();
  const pendingContacts = await getPendingContacts();
  return (
    <div className="">
      <H2>{`Welcome Back ${capitalizeFirstLetter(
        user?.firstName,
      )} ${capitalizeFirstLetter(user?.lastName)}`}</H2>
      <div className="my-6"></div>
      <fieldset className="rounded-sm border-[1px]">
        <legend className="ml-3">
          <div className="flex items-center justify-between">
            <Mail className="ml-3 mr-3 inline-block" />
            <H4 className="mr-3 inline-block">Notifications</H4>
          </div>
        </legend>
        <div className="p-3">
          <P>{`You have ${pendingContacts?.length || 0} pending inquiries.`}</P>
          <P className="[&:not(:first-child)]:mt-2">
            Click <Link href="admin/contacts">Contacts</Link> to see more
            details.
          </P>
        </div>
      </fieldset>
    </div>
  );
}
