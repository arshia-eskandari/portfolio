"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { H2 } from "@/components/ui/Typography";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Mailbox } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Contact({
  action,
}: {
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateText = (text: string, lowerBound = 5, upperBound = 50) => {
    return text.trim().length >= lowerBound && text.trim().length <= upperBound;
  };

  const validateEmail = (email: string) => {
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.toLowerCase().match(emailRegEx);
  };

  const onInputChange = (
    type: "email" | "firstName" | "lastName" | "message",
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      email:
        type === "email" && !validateEmail(e.target.value)
          ? "Invalid email"
          : type === "email" && validateEmail(e.target.value)
            ? ""
            : formErrors.email,
      firstName:
        type === "firstName" && !validateText(e.target.value)
          ? "The about first name must be 5 to 50 characters"
          : type === "firstName" && validateText(e.target.value)
            ? ""
            : formErrors.firstName,
      lastName:
        type === "lastName" && !validateText(e.target.value)
          ? "The about last name must be 5 to 50 characters"
          : type === "lastName" && validateText(e.target.value)
            ? ""
            : formErrors.lastName,
      message:
        type === "message" && !validateText(e.target.value, 50, 200)
          ? "The about message must be 50 to 200 characters"
          : type === "message" && validateText(e.target.value)
            ? ""
            : formErrors.message,
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
    if (!executeRecaptcha) {
      setErrorMssg("Something went wrong");
      setLoading(false);
      return;
    }
    const gRecaptchaToken = await executeRecaptcha(
      "contactFormArshiaEskandari",
    );
    const formData = new FormData(form);
    formData.append("gRecaptchaToken", gRecaptchaToken);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form
      id="contact"
      className="my-12 flex flex-col rounded-md bg-[#5664AB] shadow-lg"
      onSubmit={actionWithLoading}
    >
      <H2 className="mb-6 pb-6 pt-6 text-center text-white">Contact</H2>

      <div className="flex p-6">
        <div className="hidden w-1/2 items-center justify-center lg:flex">
          <Mailbox className="text-white" width={300} height={300} />
        </div>
        <div className="min-h-[240px] w-full lg:mr-[5%] lg:w-[45%]">
          <Label htmlFor="firstName" className="my-3 block text-white">
            First Name
          </Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full"
            value={form.firstName}
            onChange={(e) => onInputChange("firstName", e)}
          />
          {formErrors.firstName === "" ? null : (
            <span className="input-error-message">{formErrors.firstName}</span>
          )}

          <Label htmlFor="lastName" className="my-3 block text-white">
            Last Name
          </Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full"
            value={form.lastName}
            onChange={(e) => onInputChange("lastName", e)}
          />
          {formErrors.lastName === "" ? null : (
            <span className="input-error-message">{formErrors.lastName}</span>
          )}

          <Label htmlFor="email" className="my-3 block text-white">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            name="email"
            className="w-full"
            value={form.email}
            onChange={(e) => onInputChange("email", e)}
          />
          {formErrors.email === "" ? null : (
            <span className="input-error-message">{formErrors.email}</span>
          )}
          <Label htmlFor="text" className="my-3 block text-white">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={(e) => onInputChange("message", e)}
            placeholder="Enter about message here"
            className={cn(
              "h-[200px]",
              formErrors.message === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.message === "" ? null : (
            <span className="input-error-message">{formErrors.message}</span>
          )}
          <SubmitButton
            loading={loading}
            showSpinner={showSpinner}
            onTransitionEnd={onTransitionEnd}
            className="my-6 w-full"
          >
            Submit
          </SubmitButton>
        </div>
      </div>

      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
