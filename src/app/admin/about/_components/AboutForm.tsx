"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { About, Media } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/Select";
import { H4 } from "@/components/ui/Typography";

export default function AboutForm({
  about,
  action,
  pdfMedia,
}: {
  about: About | { id: null; text: null; resumeUrl: null };
  action: (formData: FormData) => Promise<any>;
  pdfMedia: Media[];
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
    return text.length >= 10 && text.length <= 1000;
  };

  const onInputChange = (type: "text", e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormErrors({
      text:
        type === "text" && !validateText(e.target.value)
          ? "The hero text must be 10 to 1000 characters"
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
    if (about.id) formData.append("id", about.id);
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
    if (about.text) {
      setForm({ text: about.text });
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
        <H4>About Section</H4>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Save
        </SubmitButton>
      </div>

      {/* TODO: add default value */}
      <Select>
        <SelectTrigger className="my-3 w-[180px]">
          <SelectValue placeholder="Resume" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null">None</SelectItem>
            {pdfMedia.map(({ name, url }) => (
              <SelectItem value={url} key={name}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Textarea
        id="text"
        name="text"
        value={form.text}
        onChange={(e) => onInputChange("text", e)}
        placeholder="Enter about text here"
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
