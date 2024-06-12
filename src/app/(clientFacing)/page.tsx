import About from "./_components/About";
import Experiences from "./_components/Experiences";
import Hero from "./_components/Hero";
import Projects from "./_components/Projects";
import Skills from "./_components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-[1280px] px-6">
        <About />
        <Projects />
        <Skills />
        <Experiences />
      </div>
    </>
  );
}
