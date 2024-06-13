import { H2, P } from "@/components/ui/Typography";
import { getAbout } from "../_actions/about";
import { Button } from "@/components/ui/Button";
import FlexibleImage from "./Image";
import { cn } from "@/lib/utils";

export default async function About() {
  const about = await getAbout();
  return (
    <div id="about" className="relative my-12">
      <H2 className="mb-6 pb-6 pt-6 text-center">{about.title}</H2>
      <div
        // EXPLANATION: A grid and padding bottom of 100% are required to adjust the size of next images
        className="mt-3 grid w-full grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-[5%]"
      >
        <div
          style={{
            backgroundImage: `url(./placeholder.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
          className="rounded-md"
        ></div>
        <div className="flex h-full flex-col items-start justify-start">
          <P className=" block">{about.text}</P>
          {about?.resumeUrl && (
            <a
              href={about?.resumeUrl}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap",
                "rounded-md text-sm font-medium ring-offset-background transition-colors",
                " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "focus-visible:ring-offset-2 disabled:pointer-events-none",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "h-10 px-4 py-2 mt-3"
              )}
            >
              Download Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
