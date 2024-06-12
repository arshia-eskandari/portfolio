"use client";
import { Project } from "@prisma/client";
import { H3, H4, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// EXPLANATION: Importing MediaCarousel dynamically to avoid SSR as it uses browser-specific APIs like 'window'
const MediaCarousel = dynamic(() => import('./MediaCarousel'), {
  ssr: false,
});

export default function ProjectDisplay({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const {
    urlTitles,
    urls,
    projectTechnologies,
    projectTitle,
    objective,
    keyResults,
    experienceId,
    media,
  } = project;
  const handleScrollToExperience = () => {
    // Logic to scroll to a specific experience section
    experienceId &&
      document
        .getElementById(experienceId)
        ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "mx-auto my-8 flex w-full rounded border p-4 shadow-lg",
        index % 2 === 0 ? "" : "lg:flex-row-reverse",
      )}
    >
      <div className={cn(index % 2 === 0 ? "w-1/2" :"w-[45%] mx-[5%]")}>
        <H3 className="font-bold">{projectTitle}</H3>
        <H4 className="mt-6">Objective</H4>
        <P>{objective}</P>
        <H4 className="my-6">Key Results</H4>
        <ul>
          {keyResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
        <H4 className="my-6">Links</H4>
        <div className="flex flex-wrap justify-start">
          {urlTitles.map((title, index) => (
            <a
              key={index}
              href={urls[index]}
              className="mt-2 text-blue-600 hover:underline"
            >
              {title}
            </a>
          ))}
        </div>
        <H4 className="my-6">Technologies Used</H4>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {projectTechnologies.map((tech, index) => (
              <span key={index} className="rounded bg-gray-200 px-2 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>
        {experienceId && (
          <Button onClick={handleScrollToExperience} className="my-6">
            Related Experience
          </Button>
        )}
      </div>
      <MediaCarousel media={media} />
    </div>
  );
}
