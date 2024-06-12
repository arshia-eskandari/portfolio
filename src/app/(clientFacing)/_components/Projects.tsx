import { H2 } from "@/components/ui/Typography";
import { getProjects } from "../_actions/projects";
import ProjectDisplay from "./Project";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="test  my-12">
      <H2 className="text-center">Projects</H2>
      <div>
        {projects.map((project, index) => (
          <ProjectDisplay key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
