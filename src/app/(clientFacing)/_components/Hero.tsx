import { getHero } from "../_actions/hero";
import { H1, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import HeroButtons from "./HeroButtons";

export default async function Hero() {
  const hero = await getHero();
  return (
    <main id="hero" className="flex justify-center px-6 text-white">
      <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-center md:flex-row">
        <div className="">
          <H1 className="">{hero.title}</H1>
          <P className=" my-3 block break-all">{hero.text}</P>
          <HeroButtons />
        </div>
        <div className="flex w-full justify-center md:w-1/2 lg:justify-end">
          <div className="image-placeholder w-[400px] md:w-[550px] lg:w-[700px]"></div>
        </div>
      </div>
    </main>
  );
}
