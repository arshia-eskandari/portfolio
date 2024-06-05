import { Accordion } from "@/components/ui/Accordion";
import ExperiencesForm from "./_components/ExperiencesForm";
import { H2 } from "@/components/ui/Typography";
import { getPDFMedia } from "./_actions/media";
import { addDefaultExperience, deleteExperience, getExperiences, updateExperience } from "./_actions/experiences";
import DefaultExperienceForm from "./_components/DefaultExperienceForm";

export default async function Experiences() {
  const pdfMedia = await getPDFMedia();
  const experiences = await getExperiences();
  return (
    <div className="">
      <H2>Experiences</H2>
      <DefaultExperienceForm action={addDefaultExperience} />
      <Accordion type="single" collapsible className="my-3 w-full">
        {experiences.map((experience) => (
          <ExperiencesForm
            pdfMedia={pdfMedia}
            experience={experience}
            action={updateExperience}
            deleteAction={deleteExperience}
            key={experience.id}
          />
        ))}
      </Accordion>
    </div>
  );
}
