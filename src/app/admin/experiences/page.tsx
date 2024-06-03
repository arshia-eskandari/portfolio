import { Accordion } from "@/components/ui/Accordion";
import ExperiencesForm from "./_components/ExperiencesForm";
import { H2, H4 } from "@/components/ui/Typography";

export default function Home() {
  return (
    <div className="">
      <H2>Experiences</H2>
      <H4 className="my-3">Experiences Section</H4>
      <Accordion type="single" collapsible className="my-3 w-full">
        <ExperiencesForm pdfMedia={[]} />
      </Accordion>
    </div>
  );
}
