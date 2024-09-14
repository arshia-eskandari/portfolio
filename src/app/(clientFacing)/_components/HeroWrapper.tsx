"use client";

import { useState, useEffect } from "react";
import { H1, P } from "@/components/ui/Typography";
import HeroButtons from "./HeroButtons";

interface HeroProps {
  hero: {
    id: string | null;
    title: string | null;
    text: string | null;
  };
}

const HeroWrapper: React.FC<HeroProps> = ({ hero }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      document.body.classList.add('content-animation');
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsAnimated(false);
      document.body.classList.remove('content-animation');
    };
  }, []);

  return (
    <main
      id="hero"
      className={`flex justify-center px-6 text-white ${
        isAnimated ? "hero-animation" : ""
      }`}
    >
      <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-center md:flex-row">
        <div>
          <H1>{hero.title}</H1>
          <P className="my-3 block">{hero.text}</P>
          <HeroButtons />
        </div>
        <div className="flex w-full justify-center md:w-1/2 lg:justify-end">
          <div className="image-placeholder w-[400px] md:w-[550px] lg:w-[700px]"></div>
        </div>
      </div>
    </main>
  );
};

export default HeroWrapper;
