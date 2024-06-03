"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { Experience, Media } from "@prisma/client";
import { ChangeEvent, useState } from "react";

export default function ExperiencesForm({
  experience,
  action,
  pdfMedia,
}: {
  // TODO: Make optional params required
  experience?: Experience;
  action?: (formData: FormData) => Promise<any>;
  pdfMedia: Media[];
}) {
  const [form, setForm] = useState<{
    achievements: string;
    experiences: string;
  }>({
    achievements: "",
    experiences: "",
  });
  const [formErrors, setFormErrors] = useState<{
    achievements: string;
    experiences: string;
  }>({
    achievements: "",
    experiences: "",
  });

  const validateText = (text: string) => {
    return text.length >= 10 && text.length <= 1000;
  };

  const onInputChange = (
    type: "achievements" | "experiences",
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormErrors({
      achievements:
        type === "achievements" && !validateText(e.target.value)
          ? "The achievements must be 10 to 1000 characters"
          : type === "achievements" && validateText(e.target.value)
            ? ""
            : formErrors.achievements,
      experiences:
        type === "experiences" && !validateText(e.target.value)
          ? "The experiences must be 10 to 1000 characters"
          : type === "experiences" && validateText(e.target.value)
            ? ""
            : formErrors.experiences,
    });
    const newForm = { ...form, [type]: e.target.value };
    setForm(newForm);
  };

  return (
    <form action="">
      <AccordionItem value="item-1" className="rounded-sm bg-slate-200 p-3">
        <AccordionTrigger className="no-underline">{`${"Job Title"}  |  ${"Company 1"}  |  ${"Location"}  |  ${"2022"}-${"Present"}`}</AccordionTrigger>
        <AccordionContent className="px-3">
          <Label htmlFor="resumeUrl" className="my-3 block">
            Resume
          </Label>
          <Select
            name="resumeUrl"
            defaultValue={
              pdfMedia?.find(
                (m) => experience?.recommendationLetterUrls?.includes(m.url),
              )?.url || "null"
            }
            // TODO: Figure out multiple selects
            // multiple
          >
            <SelectTrigger className="my-3 w-[180px]" id="resumeUrl">
              <SelectValue placeholder="Select Resume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Select Resume</SelectItem>
                {pdfMedia.map(({ name, url }) => (
                  <SelectItem value={url} key={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor="achievements" className="my-3 block">
            Achievements
          </Label>
          <Textarea
            id="achievements"
            name="achievements"
            value={form.achievements}
            onChange={(e) => onInputChange("achievements", e)}
            placeholder="* Add achievements in the bulletpoint format."
            className={cn(
              formErrors.achievements === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.achievements === "" ? null : (
            <span className="input-error-message">
              {formErrors.achievements}
            </span>
          )}

          <Label htmlFor="experiences" className="my-3 block">
            Experiences
          </Label>
          <Textarea
            id="experiences"
            name="experiences"
            value={form.experiences}
            onChange={(e) => onInputChange("experiences", e)}
            placeholder="* Add experiences in the bulletpoint format."
            className={cn(
              formErrors.experiences === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.experiences === "" ? null : (
            <span className="input-error-message">
              {formErrors.experiences}
            </span>
          )}
        </AccordionContent>
      </AccordionItem>
    </form>
  );
}
