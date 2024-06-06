"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { DatePickerWithRange } from "@/components/ui/DateRange";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SearchInput } from "@/components/ui/SearchInput";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { H4 } from "@/components/ui/Typography";
import { formatDate } from "@/lib/time";
import { cn } from "@/lib/utils";
import { Experience, Media } from "@prisma/client";
import { addDays } from "date-fns";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function ExperiencesForm({
  experience,
  action,
  deleteAction,
  pdfMedia,
}: {
  experience: Experience;
  action: (formData: FormData) => Promise<any>;
  deleteAction: (id: string) => Promise<any>;
  pdfMedia: Media[];
}) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteSpinner, setShowDeleteSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");
  const [form, setForm] = useState<{
    achievements: string;
    responsibilities: string;
    jobTitle: string;
    company: string;
    location: string;
  }>({
    achievements: "",
    responsibilities: "",
    jobTitle: "",
    company: "",
    location: "",
  });
  const [formErrors, setFormErrors] = useState<{
    achievements: string;
    responsibilities: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
  }>({
    achievements: "",
    responsibilities: "",
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
  });
  const [pdfMediaMap, setPdfMediaMap] = useState<Map<Media, boolean>>(
    new Map(),
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  useEffect(() => {
    const {
      achievements,
      responsibilities,
      jobTitle,
      company,
      location,
      startDate,
      endDate,
    } = experience;
    setForm({
      achievements: achievements.join(","),
      responsibilities: responsibilities.join(","),
      jobTitle,
      company,
      location,
    });
    setDate({ from: startDate, to: endDate || undefined });
  }, [experience]);

  useEffect(() => {
    const newPdfMediaMap: Map<Media, boolean> = new Map();
    pdfMedia.forEach((m) => {
      if (experience?.recommendationLetterUrls?.includes(m.url)) {
        newPdfMediaMap.set(m, true);
      } else {
        newPdfMediaMap.set(m, false);
      }
    });
    setPdfMediaMap(newPdfMediaMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfMedia]);

  const validateText = (text: string, lowerBound = 5, upperBound = 1000) => {
    return (
      text.replace(/ /g, "").length >= lowerBound &&
      text.replace(/ /g, "").length <= upperBound
    );
  };

  const onInputChange = (
    type:
      | "achievements"
      | "responsibilities"
      | "jobTitle"
      | "company"
      | "location",
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      achievements:
        type === "achievements" && !validateText(e.target.value)
          ? "The achievements must be 5 to 1000 characters"
          : type === "achievements" && validateText(e.target.value)
            ? ""
            : formErrors.achievements,
      responsibilities:
        type === "responsibilities" && !validateText(e.target.value)
          ? "The responsibilities must be 5 to 1000 characters"
          : type === "responsibilities" && validateText(e.target.value)
            ? ""
            : formErrors.responsibilities,
      jobTitle:
        type === "jobTitle" && !validateText(e.target.value, 5, 30)
          ? "The jobTitle must be 5 to 30 characters"
          : type === "jobTitle" && validateText(e.target.value, 5, 30)
            ? ""
            : formErrors.jobTitle,
      company:
        type === "company" && !validateText(e.target.value, 5, 30)
          ? "The company must be 5 to 30 characters"
          : type === "company" && validateText(e.target.value, 5, 30)
            ? ""
            : formErrors.company,
      location:
        type === "location" && !validateText(e.target.value, 5, 30)
          ? "The location must be 5 to 30 characters"
          : type === "location" && validateText(e.target.value, 5, 30)
            ? ""
            : formErrors.location,
      startDate: formErrors.startDate,
    });
    const newForm = { ...form, [type]: e.target.value };
    setForm(newForm);
  };

  const getMediaArray = (selectType: boolean) => {
    return [...pdfMediaMap]
      .filter(([_, isSelected]) => isSelected === selectType)
      .map(([m]) => m);
  };

  const updateMedium = (medium: Media, isSelected: boolean) => {
    const newPdfMediaMap: Map<Media, boolean> = new Map(pdfMediaMap);
    newPdfMediaMap.set(medium, isSelected);
    setPdfMediaMap(newPdfMediaMap);
  };

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMssg("");
    setLoading(true);
    setShowSpinner(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (!date?.from) {
      return setFormErrors({
        ...formErrors,
        startDate: "Start date cannot be empty",
      });
    }
    formData.append("startDate", date?.from?.toISOString());
    formData.append("endDate", date?.to ? date?.to?.toISOString() : "");
    const recommendationLetterUrls = [...pdfMediaMap]
      .reduce((prev, [medium, isSelected]) => {
        if (isSelected) {
          return [...prev, medium.url];
        }
        return prev;
      }, [] as string[])
      .join(",");
    formData.append("recommendationLetterUrls", recommendationLetterUrls);
    formData.append("id", experience.id);
    const response = await action(formData);
    setLoading(false);

    if (response.status === 200 || response.status === 201) {
      router.refresh();
    } else {
      setErrorMssg(response.message);
    }
  };

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form onSubmit={actionWithLoading}>
      <AccordionItem
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
          <div className="flex w-full items-center justify-between py-3">
            <H4>Experience Details</H4>
            <div>
              <SubmitButton
                type="button"
                variant="destructive"
                className="mr-3"
                loading={deleteLoading}
                showSpinner={showDeleteSpinner}
                onTransitionEnd={onTransitionEnd}
                disabled={loading}
                onClick={async (e) => {
                  e.preventDefault();
                  setErrorMssg("");
                  setDeleteLoading(true);
                  setShowDeleteSpinner(true);
                  const response = await deleteAction(experience.id);
                  if (response.status === 200 || response.status === 201) {
                    router.refresh();
                  } else {
                    setErrorMssg(response.message);
                  }
                }}
              >
                Delete
              </SubmitButton>
              <SubmitButton
                loading={loading}
                showSpinner={showSpinner}
                onTransitionEnd={onTransitionEnd}
                disabled={deleteLoading}
              >
                Save
              </SubmitButton>
            </div>
          </div>
          <Label htmlFor="jobTitle" className="my-3 block">
            Job Title
          </Label>
          <Input
            type="text"
            id="jobTitle"
            name="jobTitle"
            className="w-full lg:w-1/3"
            value={form.jobTitle}
            onChange={(e) => onInputChange("jobTitle", e)}
          />
          {formErrors.jobTitle === "" ? null : (
            <span className="input-error-message">{formErrors.jobTitle}</span>
          )}
          <Label htmlFor="company" className="my-3 block">
            Company Name
          </Label>
          <Input
            type="text"
            id="company"
            name="company"
            className="w-full lg:w-1/3"
            value={form.company}
            onChange={(e) => onInputChange("company", e)}
          />
          {formErrors.company === "" ? null : (
            <span className="input-error-message">{formErrors.company}</span>
          )}
          <Label htmlFor="location" className="my-3 block">
            Location
          </Label>
          <Input
            type="text"
            id="location"
            name="location"
            className="w-full lg:w-1/3"
            value={form.location}
            onChange={(e) => onInputChange("location", e)}
          />
          {formErrors.location === "" ? null : (
            <span className="input-error-message">{formErrors.location}</span>
          )}
          <Label htmlFor="rec" className="my-3 block">
            Recommendation Letters
          </Label>
          <SearchInput
            id="rec"
            items={getMediaArray(false)}
            itemClickHandler={(medium: Media) => updateMedium(medium, true)}
          />
          <div className="my-3">
            {getMediaArray(true).map((medium) => (
              <span key={medium.id} className="flex items-center justify-start">
                <X
                  color="red"
                  className="w-content mr-3 inline-block hover:cursor-pointer"
                  onClick={() => updateMedium(medium, false)}
                />
                {medium.name}
              </span>
            ))}
          </div>
          <Label htmlFor="date" className="my-3 block">
            Dates
          </Label>
          <DatePickerWithRange date={date} setDate={setDate} id="date" />
          {formErrors.startDate === "" ? null : (
            <span className="input-error-message">{formErrors.startDate}</span>
          )}
          <Label htmlFor="achievements" className="my-3 block">
            Achievements
          </Label>
          <Textarea
            id="achievements"
            name="achievements"
            value={form.achievements}
            onChange={(e) => onInputChange("achievements", e)}
            placeholder="Enter achievements in comma-separated format"
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

          <Label htmlFor="responsibilities" className="my-3 block">
            Responsibilities
          </Label>
          <Textarea
            id="responsibilities"
            name="responsibilities"
            value={form.responsibilities}
            onChange={(e) => onInputChange("responsibilities", e)}
            placeholder="Enter responsibilities in comma-separated format"
            className={cn(
              formErrors.responsibilities === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.responsibilities === "" ? null : (
            <span className="input-error-message">
              {formErrors.responsibilities}
            </span>
          )}
        </AccordionContent>
      </AccordionItem>
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
