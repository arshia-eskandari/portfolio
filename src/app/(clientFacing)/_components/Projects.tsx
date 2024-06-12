import { H2 } from "@/components/ui/Typography";
import { getProjects } from "../_actions/projects";
import ProjectDisplay from "./Project";
import ProjectsWrapper from "./ProjectsWrapper";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="test my-12">
      <H2 className="mb-6 pt-6 text-center">Projects</H2>
      <div>
        <ProjectsWrapper projects={projects} />
      </div>
    </div>
  );
}
