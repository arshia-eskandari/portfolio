import { H2 } from "@/components/ui/Typography";
import { getExperiences } from "../_actions/experiences"
import { Accordion } from "@/components/ui/Accordion";
import ExperienceDetails from "./Experience";

export default async function Experiences () {
  const experiences = await getExperiences();
  return (
    <div className="my-12">

    <H2 className="text-center pt-6 pb-6">Experiences</H2>
    <Accordion type="single" collapsible className="my-3 w-full">
      {experiences.map((experience) => (
        <ExperienceDetails
          experience={experience}
          key={experience.id}
        />
      ))}
    </Accordion>
    </div>
  )
}