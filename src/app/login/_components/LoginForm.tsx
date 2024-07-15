"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { H2 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function LoginForm({
  action,
}: {
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.toLowerCase().match(emailRegEx);
  };

  const onInputChange = (
    type: "email" | "password",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      email:
        type === "email" && !validateEmail(e.target.value)
          ? "Invalid email"
          : type === "email" && validateEmail(e.target.value)
            ? ""
            : formErrors.email,
      password:
        type === "password" && e.target.value.length < 8
          ? "Password is too short"
          : type === "password" && e.target.value.length >= 8
            ? ""
            : formErrors.password,
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

    if (response.status === 200) {
      router.push("/admin");
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
    <div className="w-10/12 rounded-md bg-primary p-6 md:w-7/12 lg:w-1/4">
      <form
        onSubmit={actionWithLoading}
        className="flex h-64 flex-col justify-between"
      >
        <H2 className="mb-6 border-none text-center text-white">Login</H2>

        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => onInputChange("email", e)}
          placeholder="email"
          className={cn(formErrors.email === "" ? "" : "input-error")}
        />
        {formErrors.email === "" ? null : (
          <span className="input-error-message">{formErrors.email}</span>
        )}
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => onInputChange("password", e)}
          placeholder="password"
          className={cn(formErrors.password === "" ? "" : "input-error")}
        />
        {formErrors.password === "" ? null : (
          <span className="input-error-message">{formErrors.password}</span>
        )}
        <SubmitButton
          className="admin-button"
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Login
        </SubmitButton>
      </form>
      <ErrorAlert errorMssg={errorMssg} />
    </div>
  );
}
