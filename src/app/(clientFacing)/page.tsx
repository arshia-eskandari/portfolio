import { createContact } from "./_actions/contactForm";
import About from "./_components/About";
import ContactFormWrapper from "./_components/ContactFormWrapper";
import Experiences from "./_components/Experiences";
import Hero from "./_components/Hero";
import Projects from "./_components/Projects";
import Skills from "./_components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="content">
        <div className="mx-auto max-w-[1280px] px-6">
          <About />
          <Skills />
          <Projects />
          <Experiences />
          <ContactFormWrapper action={createContact} />
        </div>
      </div>
    </>
  );
}
