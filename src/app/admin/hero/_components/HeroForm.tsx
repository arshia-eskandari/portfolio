"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { H4 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { Hero } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function HeroForm({
  hero,
  action,
}: {
  hero: Hero | { id: null; text: null; title: null };
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{ title: string; text: string }>({
    title: "",
    text: "",
  });
  const [formErrors, setFormErrors] = useState<{
    title: string;
    text: string;
  }>({
    title: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");

  const validateText = (text: string, lowerBound = 5, upperBound = 1000) => {
    return text.trim().length >= lowerBound && text.trim().length <= upperBound;
  };

  const onInputChange = (
    type: "text" | "title",
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      title:
        type === "title" && !validateText(e.target.value, 5, 150)
          ? "The hero title must be 5 to 150 characters"
          : type === "title" && validateText(e.target.value, 5, 150)
            ? ""
            : formErrors.title,
      text:
        type === "text" && !validateText(e.target.value)
          ? "The hero text must be 5 to 1000 characters"
          : type === "text" && validateText(e.target.value)
            ? ""
            : formErrors.text,
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
    if (hero.id) formData.append("id", hero.id);
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
    setForm({ text: hero?.text || "", title: hero?.title || "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form className="my-3" onSubmit={actionWithLoading}>
      <div className="flex w-full items-center justify-between py-3">
        <H4 className="mb-3">Hero Section</H4>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Save
        </SubmitButton>
      </div>

      <Label htmlFor="text" className="my-3 block">
        Hero Title
      </Label>
      <Input
        type="text"
        id="title"
        name="title"
        className="w-full lg:w-1/3"
        value={form.title}
        onChange={(e) => onInputChange("title", e)}
      />
      {formErrors.title === "" ? null : (
        <span className="input-error-message">{formErrors.title}</span>
      )}
      <Label htmlFor="text" className="my-3 block">
        Hero Text
      </Label>
      <Textarea
        id="text"
        name="text"
        value={form.text}
        placeholder="Enter hero text here"
        onChange={(e) => onInputChange("text", e)}
        className={cn(
          formErrors.text === ""
            ? ""
            : "input-error ring-0 focus-visible:ring-0",
        )}
      />
      {formErrors.text === "" ? null : (
        <span className="input-error-message">{formErrors.text}</span>
      )}
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
