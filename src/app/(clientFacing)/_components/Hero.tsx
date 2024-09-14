import { getClientHero } from "../_actions/hero";
import HeroWrapper from "./HeroWrapper";

export default async function Hero() {
  const hero = await getClientHero();
  return (
    <HeroWrapper hero={hero} />
  );
}
