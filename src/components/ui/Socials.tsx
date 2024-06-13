"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Social, SocialNames } from "@prisma/client";
import Image from "next/image";

export default function Socials({ socials }: { socials: Social[] }) {
  const linkedin = socials.find((s) => s.name === SocialNames.LINKEDIN);
  const github = socials.find((s) => s.name === SocialNames.GITHUB);
  const telegram = socials.find((s) => s.name === SocialNames.TELEGRAM);
  const email = socials.find((s) => s.name === SocialNames.EMAIL);

  const [bottomMargin, setBottomMargin] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolledFromTop = window.scrollY;

      if (scrolledFromTop >= scrollableHeight) {
        setBottomMargin(50);
      } else {
        setBottomMargin(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed right-1 z-50 my-auto flex md:top-1/2",
        "transform flex-row rounded-md md:-translate-y-1/2 md:flex-col",
        "border bg-[#FFFFFF50] shadow-lg",
        "bottom-1 -translate-x-1/2 md:bottom-auto md:-translate-x-0",
      )}
      style={{ marginBottom: `${bottomMargin}px` }}
    >
      {linkedin && (
        <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={"/linkedin.svg"}
            alt="LinkedIn"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
      {github && (
        <a href={github.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={"/github.svg"}
            alt="GitHub"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
      {telegram && (
        <a href={telegram.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={"/telegram.svg"}
            alt="Telegram"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email.url}`}
          className="flex items-center justify-center"
        >
          <Image
            src={"/email.svg"}
            alt="Email"
            width={30}
            height={30}
            className="m-3 inline-block"
          />
        </a>
      )}
    </div>
  );
}
