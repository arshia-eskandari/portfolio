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
        "transform flex-row rounded-2xl md:-translate-y-1/2 md:flex-col",
        "border bg-[#FFFFFF50] shadow-lg",
        "bottom-1 -translate-x-1/2 md:bottom-auto md:-translate-x-0",
        "left-1/2 w-[calc(90px+4.5rem)] md:left-auto md:w-auto",
      )}
      style={{ marginBottom: `${bottomMargin}px` }}
    >
      {linkedin?.url && (
        <a
          href={linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="animated-button shine m-3 rounded-sm"
        >
          <Image
            src={"/linkedin.svg"}
            alt="LinkedIn"
            width={30}
            height={30}
            className="inline-block"
          />
        </a>
      )}
      {github?.url && (
        <a
          href={github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="animated-button shine m-3 rounded-[50%]"
        >
          <Image
            src={"/github.svg"}
            alt="GitHub"
            width={30}
            height={30}
            className="inline-block"
          />
        </a>
      )}
      {telegram?.url && (
        <a
          href={telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="animated-button shine m-3 rounded-sm"
        >
          <Image
            src={"/telegram.svg"}
            alt="Telegram"
            width={30}
            height={30}
            className="inline-block"
          />
        </a>
      )}
      {email?.url && (
        <a
          href={`mailto:${email.url}`}
          className="animated-button shine m-3 flex items-center justify-center rounded-sm"
        >
          <Image
            src={"/email.svg"}
            alt="Email"
            width={30}
            height={30}
            className="inline-block"
          />
        </a>
      )}
    </div>
  );
}
