"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { H4, P } from "@/components/ui/Typography";
import { capitalizeFirstLetter } from "@/lib/string";
import { formatDate } from "@/lib/time";
import { Experience } from "@prisma/client";

export default function ExperienceDetails({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div>
      <AccordionItem
        id={experience.id}
        value={experience.id}
        className="rounded-sm bg-slate-200 p-3"
      >
        <AccordionTrigger className="no-underline">
          {`${experience.jobTitle}  |  ${experience.company}  |  ${
            experience.location
          }  |  ${formatDate(experience.startDate)} - ${
            experience.endDate ? formatDate(experience.endDate) : "Present"
          }`}
        </AccordionTrigger>
        <AccordionContent className="px-3">
          <P className="font-bold">Experience Details</P>
          <P>Achievements</P>
          <ul className="ml-6 list-disc">
            {experience.achievements.map((a) => {
              return <li key={a}>{capitalizeFirstLetter(a)}</li>;
            })}
          </ul>
          <P>Reponsibilities</P>
          <ul className="ml-6 list-disc">
            {experience.responsibilities.map((a) => {
              return <li key={a}>{capitalizeFirstLetter(a)}</li>;
            })}
          </ul>
          {experience?.recommendationLetterUrls && (
            <>
              <P>Recommendation Letters</P>
              {experience.recommendationLetterUrls.map((url, i) => (
                <a
                  key={url}
                  href={url}
                  // EXPLANATION: When clicking on the checkbox the modal should not appear
                  onClick={(e) => e.stopPropagation()}
                  className="flex"
                >{`Recommendation Letter ${i + 1}`}</a>
              ))}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
