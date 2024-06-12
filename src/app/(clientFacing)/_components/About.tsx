import { H2, P } from "@/components/ui/Typography";
import { getAbout } from "../_actions/about";
import { Button } from "@/components/ui/Button";
import FlexibleImage from "./Image";

export default async function About() {
  const about = await getAbout();
  return (
    <div id="about" className="relative my-12">
      <H2 className="text-center">{about.title}</H2>
      <div
        // EXPLANATION: A grid and padding bottom of 100% are required to adjust the size of next images
        className="mt-3 grid w-full grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-2"
      >
        <FlexibleImage src={"./placeholder.svg"} alt="about image" />
        <div className="flex h-full flex-col items-start justify-start">
          <P className=" block">{about.text}</P>
          {/* TODO: add pdf download functionality */}
          <Button>Download Resume</Button>
        </div>
      </div>
    </div>
  );
}
