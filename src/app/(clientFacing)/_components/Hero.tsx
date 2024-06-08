import Trapezoids from "@/assets/Trapizoids";
import { getHero } from "../_actions/hero";
import { H1, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default async function Hero() {
  const hero = await getHero();
  return (
    <main id="hero" className="relative h-[calc(100vh-72px)] overflow-hidden">
      <Trapezoids />
      <div className="absolute flex h-full flex-col items-start justify-center p-3">
        <H1>{hero.title}</H1>
        <P className="block my-3">{hero.text}</P>
        <div>
          <Button className="mr-3">About</Button>
          <Button>Contact</Button>
        </div>
      </div>
    </main>
  );
}
