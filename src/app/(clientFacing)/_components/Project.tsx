"use client";
import { Project } from "@prisma/client";
import { H3, H4, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

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
    const button = document.getElementById(experienceId);
    const openData = button?.dataset.state;

    if (button && openData === "closed") {
      button.click();

      setTimeout(() => {
        const mainDiv = document.getElementById(`div-${experienceId}`);
        mainDiv?.scrollIntoView({ behavior: "smooth" });
      }, 200); // add delay for the any open accordion item to fully close
    } else {
      const mainDiv = document.getElementById(`div-${experienceId}`);
      mainDiv?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id={`project-${index + 1}`}
      className={cn(
        "mx-auto my-6 flex w-full flex-col rounded-2xl border bg-[#FFFFFF50] p-4 shadow-lg lg:flex-row lg:justify-between",
        index % 2 === 0 ? "" : "lg:flex-row-reverse",
      )}
    >
      <div
        className={cn(
          // index % 2 === 0 ? "lg:mr-[5%] lg:w-[45%]" : "lg:mx-[5%] lg:w-[45%]",
          "lg:w-[45%]",
        )}
      >
        <H3 className="font-bold">{projectTitle}</H3>
        <H4 className="mt-6">Objective</H4>
        <P>{objective}</P>
        <H4 className="my-6">Key Results</H4>
        <ul className="list-none space-y-1">
          {keyResults.map((result, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="shrink-0">-</span>
              <span>{result}</span>
            </li>
          ))}
        </ul>
        <H4 className="my-6">Links</H4>
        <ul className="">
          {urlTitles.map((title, index) => (
            <li key={`li-${index}`}>
              <a
                key={index}
                href={urls[index]}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <H4 className="my-6">Technologies Used</H4>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {projectTechnologies.map((tech, index) => (
              <span
                key={index}
                className="animated-button shine flex h-10 items-center justify-center rounded-2xl bg-[#050041] px-4 py-2 text-sm font-medium text-white shadow"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {experienceId && (
          <Button onClick={handleScrollToExperience} className="mb-6">
            Related Experience
            <ChevronDown className="ml-3" />
          </Button>
        )}
      </div>
      <MediaCarousel media={media} />
    </div>
  );
}
