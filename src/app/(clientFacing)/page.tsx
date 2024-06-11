import About from "./_components/About";
import Experiences from "./_components/Experiences";
import Hero from "./_components/Hero";
import Skills from "./_components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="content">
        <div className="max-w-[1280px] mx-auto">
          <About />
          <Skills />
          <Experiences />
        </div>
      </div>
    </>
  );
}
