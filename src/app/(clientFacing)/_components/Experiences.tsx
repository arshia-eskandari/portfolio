import { H2 } from "@/components/ui/Typography";
import { getClientExperiences } from "../_actions/experiences";
import { Accordion } from "@/components/ui/Accordion";
import ExperienceDetails from "./Experience";
import { sortExperiences } from "@/lib/experiences";

export default async function Experiences() {
  const experiences = await getClientExperiences();
  return (
    <div className="my-12" id="experiences">
      <H2 className="pb-6 pt-6 text-center">Experiences</H2>
      <Accordion type="single" collapsible className="my-3 w-full">
        {sortExperiences(experiences).map((experience) => (
          <ExperienceDetails experience={experience} key={experience.id} />
        ))}
      </Accordion>
    </div>
  );
}
