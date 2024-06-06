import { Accordion } from "@/components/ui/Accordion";
import { H2 } from "@/components/ui/Typography";
import { getMedia } from "./_actions/media";
import { getExperiences } from "./_actions/experiences";
import ProjectsForm from "./_components/ProjectsForm";
import {
  addDefaultProject,
  deleteProject,
  getProjects,
} from "./_actions/projects";
import DefaultProjectForm from "./_components/DefaultProjectForm";

export default async function Experiences() {
  const media = await getMedia();
  const experiences = await getExperiences();
  const projects = await getProjects();
  return (
    <div className="">
      <H2>Experiences</H2>
      <DefaultProjectForm action={addDefaultProject} />
      <Accordion type="single" collapsible className="my-3 w-full">
        {projects.map((project) => (
          <ProjectsForm
            media={media}
            experiences={experiences}
            action={async (formData: FormData) => {
              "use server";
            }}
            deleteAction={deleteProject}
            project={project}
            key={project.id}
          />
        ))}
      </Accordion>
    </div>
  );
}
