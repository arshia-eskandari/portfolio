"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { H4 } from "@/components/ui/Typography";
import { SENTENCE_SEPARATOR } from "@/config/separator";
import { cn } from "@/lib/utils";
import { Project, Media, Experience } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProjectsForm({
  project,
  action,
  deleteAction,
  media,
  experiences,
}: {
  project: Project;
  action: (formData: FormData) => Promise<any>;
  deleteAction: (id: string) => Promise<any>;
  media: Media[];
  experiences: Experience[];
}) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteSpinner, setShowDeleteSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");
  const [form, setForm] = useState<{
    urlTitles: string;
    projectTechnologies: string;
    projectTitle: string;
    objective: string;
    keyResults: string;
    urls: string;
  }>({
    urlTitles: "",
    projectTechnologies: "",
    projectTitle: "",
    objective: "",
    keyResults: "",
    urls: "",
  });
  const [formErrors, setFormErrors] = useState<{
    urlTitles: string;
    projectTechnologies: string;
    projectTitle: string;
    objective: string;
    keyResults: string;
    urls: string;
  }>({
    urlTitles: "",
    projectTechnologies: "",
    projectTitle: "",
    objective: "",
    keyResults: "",
    urls: "",
  });
  const [mediaMap, setMediaMap] = useState<Map<Media, boolean>>(new Map());

  useEffect(() => {
    const {
      urlTitles,
      urls,
      projectTechnologies,
      projectTitle,
      objective,
      keyResults,
    } = project;
    setForm({
      urlTitles: urlTitles.join(","),
      projectTechnologies: projectTechnologies.join(","),
      projectTitle,
      objective,
      keyResults: keyResults.join(SENTENCE_SEPARATOR),
      urls: urls.join(","),
    });
  }, [project]);

  useEffect(() => {
    const newMediaMap: Map<Media, boolean> = new Map();
    media.forEach((m) => {
      if (project?.media?.includes(m.url)) {
        newMediaMap.set(m, true);
      } else {
        newMediaMap.set(m, false);
      }
    });
    setMediaMap(newMediaMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  useEffect(() => {}, [project]);
  const validateText = (text: string, lowerBound = 5, upperBound = 1000) => {
    return (
      text.replace(/ /g, "").length >= lowerBound &&
      text.replace(/ /g, "").length <= upperBound
    );
  };

  const onInputChange = (
    type:
      | "urlTitles"
      | "urls"
      | "projectTechnologies"
      | "projectTitle"
      | "objective"
      | "keyResults",
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      projectTitle:
        type === "projectTitle" && !validateText(e.target.value, 5, 100)
          ? "The url titles must be 5 to 100 characters"
          : type === "projectTitle" && validateText(e.target.value, 5, 100)
            ? ""
            : formErrors.projectTitle,
      urlTitles:
        type === "urlTitles" && !validateText(e.target.value)
          ? "The url titles must be 5 to 1000 characters"
          : type === "urlTitles" && validateText(e.target.value)
            ? ""
            : formErrors.urlTitles,
      urls:
        type === "urls" && !validateText(e.target.value)
          ? "The urls must be 5 to 1000 characters"
          : type === "urls" && validateText(e.target.value)
            ? ""
            : formErrors.urls,
      projectTechnologies:
        type === "projectTechnologies" && !validateText(e.target.value)
          ? "The project technologies must be 5 to 1000 characters"
          : type === "projectTechnologies" && validateText(e.target.value)
            ? ""
            : formErrors.projectTechnologies,
      objective:
        type === "objective" && !validateText(e.target.value, 5, 250)
          ? "The objective must be 5 to 150 characters"
          : type === "objective" && validateText(e.target.value, 5, 250)
            ? ""
            : formErrors.objective,
      keyResults:
        type === "keyResults" && !validateText(e.target.value, 5, 1000)
          ? "The key results must be 5 to 1000 characters"
          : type === "keyResults" && validateText(e.target.value, 5, 1000)
            ? ""
            : formErrors.keyResults,
    });
    const newForm = { ...form, [type]: e.target.value };
    setForm(newForm);
  };

  const getMediaArray = (selectType: boolean) => {
    return [...mediaMap]
      .filter(([_, isSelected]) => isSelected === selectType)
      .map(([m]) => m);
  };

  const updateMedium = (medium: Media, isSelected: boolean) => {
    const newMediaMap: Map<Media, boolean> = new Map(mediaMap);
    newMediaMap.set(medium, isSelected);
    setMediaMap(newMediaMap);
  };

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMssg("");
    setLoading(true);
    setShowSpinner(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const media = [...mediaMap]
      .reduce((prev, [medium, isSelected]) => {
        if (isSelected) {
          return [...prev, medium.url];
        }
        return prev;
      }, [] as string[])
      .join(",");
    formData.append("media", media);
    formData.append("id", project.id);
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
      <AccordionItem value={project.id} className="rounded-sm bg-slate-200 p-3">
        <AccordionTrigger className="no-underline">
          {`${project.projectTitle}`}
        </AccordionTrigger>
        <AccordionContent className="px-3">
          <div className="flex w-full items-center justify-between py-3">
            <H4>Project Details</H4>
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
                  if (
                    window.confirm(
                      `Are you sure you want to delete ${project.projectTitle}?`,
                    )
                  ) {
                    const response = await deleteAction(project.id);
                    if (response.status === 200 || response.status === 201) {
                      router.refresh();
                    } else {
                      setErrorMssg(response.message);
                    }
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
          <Label htmlFor="projectTitle" className="my-3 block">
            Project Title
          </Label>
          <Input
            type="text"
            id="projectTitle"
            name="projectTitle"
            className="w-full lg:w-1/3"
            value={form.projectTitle}
            onChange={(e) => onInputChange("projectTitle", e)}
          />
          {formErrors.projectTitle === "" ? null : (
            <span className="input-error-message">
              {formErrors.projectTitle}
            </span>
          )}
          <Label htmlFor="media" className="my-3 block">
            Media
          </Label>
          <SearchInput
            id="media"
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
          <Label htmlFor="experienceId" className="my-3 block">
            Experience
          </Label>
          <Select
            name="experienceId"
            defaultValue={
              experiences?.find((e) => e.id === project.experienceId)?.id ||
              "null"
            }
          >
            <SelectTrigger className="my-3 w-[180px]" id="resumeUrl">
              <SelectValue placeholder="Select Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Select Experience</SelectItem>
                {experiences.map(({ company, id }) => (
                  <SelectItem value={id} key={id}>
                    {company}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor="urls" className="my-3 block">
            URLs
          </Label>
          <Textarea
            id="urls"
            name="urls"
            value={form.urls}
            onChange={(e) => onInputChange("urls", e)}
            placeholder="Enter urls in comma-separated format"
            className={cn(
              formErrors.urls === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.urls === "" ? null : (
            <span className="input-error-message">{formErrors.urls}</span>
          )}
          <Label htmlFor="urlTitles" className="my-3 block">
            URL Titles
          </Label>
          <Textarea
            id="urlTitles"
            name="urlTitles"
            value={form.urlTitles}
            onChange={(e) => onInputChange("urlTitles", e)}
            placeholder="Enter url titles in comma-separated format"
            className={cn(
              formErrors.urlTitles === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.urlTitles === "" ? null : (
            <span className="input-error-message">{formErrors.urlTitles}</span>
          )}
          <Label htmlFor="projectTechnologies" className="my-3 block">
            Project Technologies
          </Label>
          <Textarea
            id="projectTechnologies"
            name="projectTechnologies"
            value={form.projectTechnologies}
            onChange={(e) => onInputChange("projectTechnologies", e)}
            placeholder="Enter project technologies in comma-separated format"
            className={cn(
              formErrors.projectTechnologies === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.projectTechnologies === "" ? null : (
            <span className="input-error-message">
              {formErrors.projectTechnologies}
            </span>
          )}
          <Label htmlFor="objective" className="my-3 block">
            Objective
          </Label>
          <Textarea
            id="objective"
            name="objective"
            value={form.objective}
            onChange={(e) => onInputChange("objective", e)}
            placeholder="Enter objective in comma-separated format"
            className={cn(
              formErrors.objective === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.objective === "" ? null : (
            <span className="input-error-message">{formErrors.objective}</span>
          )}
          <Label htmlFor="keyResults" className="my-3 block">
            Key Results
          </Label>
          <Textarea
            id="keyResults"
            name="keyResults"
            value={form.keyResults}
            onChange={(e) => onInputChange("keyResults", e)}
            placeholder="Enter key results separating them by ( | )"
            className={cn(
              formErrors.keyResults === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.keyResults === "" ? null : (
            <span className="input-error-message">{formErrors.keyResults}</span>
          )}
        </AccordionContent>
      </AccordionItem>
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
