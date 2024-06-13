"use client";
import { Project } from "@prisma/client";
import { H3, H4, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// EXPLANATION: Importing MediaCarousel dynamically to avoid SSR as it uses browser-specific APIs like 'window'
const MediaCarousel = dynamic(() => import("./MediaCarousel"), {
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
    if (!experienceId) return;
    const mainDiv = document.getElementById(`div-${experienceId}`);
    const button = document.getElementById(experienceId);
    if (button) {
      button.click();
    }
    mainDiv?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "mx-auto my-6 flex w-full flex-col rounded border p-4 shadow-lg lg:flex-row bg-[#FFFFFF50]",
        index % 2 === 0 ? "" : "lg:flex-row-reverse",
      )}
    >
      <div
        className={cn(
          index % 2 === 0 ? "lg:mr-[5%] lg:w-[45%]" : "lg:mx-[5%] lg:w-[45%]",
        )}
      >
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
              <span
                key={index}
                className="h-10 rounded-md bg-[#050041] px-4 py-2 text-white shadow text-sm font-medium flex items-center justify-center"
              >
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
