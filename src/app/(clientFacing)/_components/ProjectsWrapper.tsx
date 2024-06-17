"use client";
import ProjectDisplay from "./Project";
import { useState, useRef } from "react";
import { Project } from "@prisma/client";
import { Button } from "@/components/ui/Button";

export default function ProjectsWrapper({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const endOfProjectsRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => {
    setVisibleCount(projects.length);
  };

  const handleViewLess = () => {
    setVisibleCount(3);
    scrollToEndOfProjects();
  };

  const scrollToEndOfProjects = () => {
    endOfProjectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div>
        {projects.slice(0, visibleCount).map((project, index) => {
          if (projects.length > 3 && index === 2) {
            return (
              <div key={`div-${index}`} ref={endOfProjectsRef}>
                <ProjectDisplay
                  key={project.id}
                  project={project}
                  index={index}
                />
              </div>
            );
          }
          return (
            <ProjectDisplay key={project.id} project={project} index={index} />
          );
        })}
        <div />
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        {visibleCount > 3 && (
          <Button onClick={handleViewLess}>View Less</Button>
        )}
        {visibleCount < projects.length && (
          <Button onClick={handleViewMore}>View More</Button>
        )}
      </div>
    </>
  );
}
