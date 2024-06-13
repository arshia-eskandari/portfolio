import { cn } from "@/lib/utils";
import { Social, SocialNames } from "@prisma/client";
import Image from "next/image";

export default function Socials({ socials }: { socials: Social[] }) {
  const linkedin = socials.find((s) => s.name === SocialNames.LINKEDIN);
  const github = socials.find((s) => s.name === SocialNames.GITHUB);
  const telegram = socials.find((s) => s.name === SocialNames.TELEGRAM);
  const email = socials.find((s) => s.name === SocialNames.EMAIL);
  return (
    <div
      className={cn(
        "fixed right-1 md:top-1/2 z-50 my-auto flex",
        "md:-translate-y-1/2 transform md:flex-col rounded-md flex-row",
        "border bg-[#FFFFFF50] shadow-lg",
        "-translate-x-1/2 bottom-1"
      )}
    >
      {linkedin && (
        <a href={linkedin.url} target="_blank">
          <Image
            src={"/linkedin.svg"}
            alt="linkedin"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
      {github && (
        <a href={github.url} target="_blank">
          <Image
            src={"/github.svg"}
            alt="github"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
      {telegram && (
        <a href={telegram.url} target="_blank">
          <Image
            src={"/telegram.svg"}
            alt="telegram"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
      {email && (
        <a href={`mailto:${email.url}`}>
          <Image
            src={"/email.svg"}
            alt="email"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
    </div>
  );
}
