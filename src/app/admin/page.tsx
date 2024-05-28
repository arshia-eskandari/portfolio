import { H2 } from "@/components/ui/Typography";
import { getUser } from "./_actions/jwt";
import {capitalizeFirstLetter} from "@/lib/string"

export default async function AdminDashboard() {
  const user = await getUser();
  return (
    <div className="">
      <H2>{`Welcome Back ${capitalizeFirstLetter(
        user?.firstName,
      )} ${capitalizeFirstLetter(user?.lastName)}`}</H2>
      <div className="my-6"></div>
    </div>
  );
}
