import { H2 } from "@/components/ui/Typography";
import { getClientProjects } from "../_actions/projects";
import ProjectsWrapper from "./ProjectsWrapper";

export default async function Projects() {
  const projects = await getClientProjects();

  return (
    <div className="test my-12" id="projects">
      <H2 className="mb-6 pt-6 pb-6 text-center">Projects</H2>
      <div>
        <ProjectsWrapper projects={projects} />
      </div>
    </div>
  );
}
