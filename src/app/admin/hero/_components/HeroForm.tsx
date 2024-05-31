"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { Hero } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function HeroForm({
  hero,
  action,
}: {
  hero: Hero | { id: null; text: null };
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{ text: string }>({
    text: "",
  });
  const [formErrors, setFormErrors] = useState<{
    text: string;
  }>({
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");

  const validateText = (text: string) => {
    return text.length >= 10 && text.length <= 150;
  };

  const onInputChange = (type: "text", e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormErrors({
      text:
        type === "text" && !validateText(e.target.value)
          ? "The hero text must be 10 to 150 characters"
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
    if (hero.text) {
      setForm({ text: hero.text });
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
        <Label htmlFor="text" className="mb-3 hover:cursor-pointer">
          Hero Text
        </Label>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Save
        </SubmitButton>
      </div>

      <Textarea
        id="text"
        name="text"
        value={form.text}
        onChange={(e) => onInputChange("text", e)}
        className={cn(formErrors.text === "" ? "" : "input-error")}
      />
      {formErrors.text === "" ? null : (
        <span className="input-error-message">{formErrors.text}</span>
      )}
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
