import About from "./_components/About";
import Experiences from "./_components/Experiences";
import Hero from "./_components/Hero";
import Skills from "./_components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-5">
        <About />
        <Skills />
        <Experiences />
      </div>
    </>
  );
}
