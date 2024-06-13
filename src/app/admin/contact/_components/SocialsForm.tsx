"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { cn } from "@/lib/utils";
import { Social, SocialNames } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { H4 } from "@/components/ui/Typography";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Image from "next/image";

export default function SocialsForm({
  socials,
  action,
}: {
  socials: Social[];
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{
    githubUrl: string;
    linkedinUrl: string;
    telegramUrl: string;
    emailAddress: string;
  }>({
    githubUrl: "",
    linkedinUrl: "",
    telegramUrl: "",
    emailAddress: "",
  });
  const [formErrors, setFormErrors] = useState<{
    githubUrl: string;
    linkedinUrl: string;
    telegramUrl: string;
    emailAddress: string;
  }>({
    githubUrl: "",
    linkedinUrl: "",
    telegramUrl: "",
    emailAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");

  const validateUrl = (text: string) => {
    return text.length <= 100;
  };

  const onInputChange = (
    type: "githubUrl" | "linkedinUrl" | "telegramUrl" | "emailAddress",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      ...formErrors,
      [type]: !validateUrl(e.target.value)
        ? "The url must be less than 100 characters"
        : validateUrl(e.target.value)
          ? ""
          : formErrors[type],
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
    const newForm = {
      githubUrl: "",
      linkedinUrl: "",
      telegramUrl: "",
      emailAddress: "",
    };
    socials.forEach((social) => {
      switch (social.name) {
        case SocialNames.GITHUB:
          newForm.githubUrl = social.url;
          break;
        case SocialNames.LINKEDIN:
          newForm.linkedinUrl = social.url;
          break;
        case SocialNames.TELEGRAM:
          newForm.telegramUrl = social.url;
          break;
        case SocialNames.EMAIL:
          newForm.emailAddress = social.url;
          break;
      }
    });
    setForm(newForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form className="my-3" onSubmit={actionWithLoading}>
      <div className="flex w-full items-center justify-between py-3">
        <H4>Socials Section</H4>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Save
        </SubmitButton>
      </div>

      <Label htmlFor="linkedinUrl" className="my-3 flex items-end">
        <Image
          src={"/linkedin.svg"}
          alt="Linkedin"
          width={15}
          height={15}
          className="mr-3 inline-block"
        />
        LinkedIn
      </Label>
      <Input
        type="text"
        name="linkedinUrl"
        id="linkedinUrl"
        value={form.linkedinUrl}
        onChange={(e) => onInputChange("linkedinUrl", e)}
        className={cn(
          formErrors.linkedinUrl === "" ? "" : "input-error",
          "w-full md:w-1/2",
        )}
        placeholder="LinkedIn URL"
      />
      {formErrors.linkedinUrl === "" ? null : (
        <span className="input-error-message">{formErrors.linkedinUrl}</span>
      )}
      <ErrorAlert errorMssg={errorMssg} />

      <Label htmlFor="githubUrl" className="my-3 flex items-end">
        <Image
          src={"/github.svg"}
          alt="Github"
          width={15}
          height={15}
          className="mr-3 inline-block"
        />
        Github
      </Label>
      <Input
        type="text"
        name="githubUrl"
        id="githubUrl"
        value={form.githubUrl}
        onChange={(e) => onInputChange("githubUrl", e)}
        className={cn(
          formErrors.githubUrl === "" ? "" : "input-error",
          "w-full md:w-1/2",
        )}
        placeholder="Github URL"
      />
      {formErrors.githubUrl === "" ? null : (
        <span className="input-error-message">{formErrors.githubUrl}</span>
      )}
      <ErrorAlert errorMssg={errorMssg} />

      <Label htmlFor="telegramUrl" className="my-3 flex items-end">
        <Image
          src={"/telegram.svg"}
          alt="Telegram"
          width={15}
          height={15}
          className="mr-3 inline-block"
        />
        Telegram
      </Label>
      <Input
        type="text"
        name="telegramUrl"
        id="telegramUrl"
        value={form.telegramUrl}
        onChange={(e) => onInputChange("telegramUrl", e)}
        className={cn(
          formErrors.telegramUrl === "" ? "" : "input-error",
          "w-full md:w-1/2",
        )}
        placeholder="Telegram URL"
      />
      {formErrors.telegramUrl === "" ? null : (
        <span className="input-error-message">{formErrors.telegramUrl}</span>
      )}

      <Label htmlFor="emailAddress" className="my-3 flex items-end">
        <Image
          src={"/email.svg"}
          alt="Email"
          width={15}
          height={15}
          className="mr-3 inline-block"
        />
        Email
      </Label>
      <Input
        type="text"
        name="emailAddress"
        id="emailAddress"
        value={form.emailAddress}
        onChange={(e) => onInputChange("emailAddress", e)}
        className={cn(
          formErrors.emailAddress === "" ? "" : "input-error",
          "w-full md:w-1/2",
        )}
        placeholder="Email address"
      />
      {formErrors.emailAddress === "" ? null : (
        <span className="input-error-message">{formErrors.emailAddress}</span>
      )}
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
