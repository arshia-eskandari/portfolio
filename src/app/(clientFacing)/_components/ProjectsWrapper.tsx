"use client";
import { H2 } from "@/components/ui/Typography";
import ProjectDisplay from "./Project";
import { useState, useRef, useEffect } from "react";
import { Project } from "@prisma/client";
import { Button } from "@/components/ui/Button";

export default function ProjectsWrapper({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const endOfProjectsRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => {
    setVisibleCount(projects.length); // Show all projects when clicking 'View More'
  };

  const handleViewLess = () => {
    setVisibleCount(3); // Reset to showing the first three projects when clicking 'View Less'
    scrollToEndOfProjects();
  };

  const scrollToEndOfProjects = () => {
    endOfProjectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (visibleCount === 3) {
      scrollToEndOfProjects(); // Automatically scroll to the end of projects when the count is reset to 3
    }
  }, [visibleCount]);

  // TODO: Figure out scrolling after clicking "View Less"
  return (
    <>
      <div ref={endOfProjectsRef}>
        {projects.slice(0, visibleCount).map((project, index) => {
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
