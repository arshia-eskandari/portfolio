import { H2 } from "../../../components/ui/Typography";
import { addHero, getHero } from "./_actions/hero";
import HeroForm from "./_components/HeroForm";

export default async function AdminHero() {
  const hero = await getHero();
  return (
    <div className="">
      <H2>Hero</H2>
      <HeroForm hero={hero} action={addHero}/>
    </div>
  );
}