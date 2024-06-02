"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Label } from "@/components/ui/Label";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { H4 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { Hero, Skills } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SkillsForm({
  skills,
  action,
}: {
  skills: Skills | { id: null; skills: null };
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{ skills: string }>({
    skills: "",
  });
  const [formErrors, setFormErrors] = useState<{
    skills: string;
  }>({
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");

  const validateSkills = (skills: string) => {
    return skills.length >= 10 && skills.length <= 1000;
  };

  const onInputChange = (
    type: "skills",
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormErrors({
      skills:
        type === "skills" && !validateSkills(e.target.value)
          ? "The hero skills must be 10 to 1000 characters"
          : type === "skills" && validateSkills(e.target.value)
            ? ""
            : formErrors.skills,
    });
    const newForm = { ...form, [type]: e.target.value };
    setForm(newForm);
  };

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMssg("");
    setLoading(true);
    setShowSpinner(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (skills.id) formData.append("id", skills.id);
    const response = await action(formData);
    setLoading(false);

    if (response.status === 200 || response.status === 201) {
      router.refresh();
    } else {
      setErrorMssg(response.message);
    }
  };

  useEffect(() => {
    if (errorMssg !== "") setErrorMssg("");
    if (skills.skills) {
      setForm({ skills: skills.skills.join(",") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form className="my-3" onSubmit={actionWithLoading}>
      <div className="flex w-full items-center justify-between py-3">
        <H4 className="mb-3">Skills Section</H4>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Save
        </SubmitButton>
      </div>

      <Label htmlFor="skills" className="my-3 block">
        Skills
      </Label>
      <Textarea
        id="skills"
        name="skills"
        value={form.skills}
        placeholder="Enter skills in comma-separated format"
        onChange={(e) => onInputChange("skills", e)}
        className={cn(
          formErrors.skills === ""
            ? ""
            : "input-error ring-0 focus-visible:ring-0",
        )}
      />
      {formErrors.skills === "" ? null : (
        <span className="input-error-message">{formErrors.skills}</span>
      )}
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
