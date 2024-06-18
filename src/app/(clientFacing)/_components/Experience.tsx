"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { P } from "@/components/ui/Typography";
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
        id={`div-${experience.id}`}
        value={experience.id}
        className="my-6 rounded-md bg-[#050041] p-3 text-white"
      >
        <AccordionTrigger className="no-underline" id={experience.id}>
          {`${experience.jobTitle}  |  ${experience.company}  |  ${
            experience.location
          }  |  ${formatDate(new Date(experience.startDate))} - ${
            experience.endDate
              ? formatDate(new Date(experience.endDate))
              : "Present"
          }`}
        </AccordionTrigger>
        <AccordionContent className="px-3" id={`content-${experience.id}`}>
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
              <ul className="ml-6 list-disc">
                {experience.recommendationLetterUrls.map((url, i) => (
                  <li key={url}>
                    <a
                      key={url}
                      href={url}
                      // EXPLANATION: When clicking on the checkbox the modal should not appear
                      onClick={(e) => e.stopPropagation()}
                      className="flex underline"
                    >{`Recommendation Letter ${i + 1}`}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
