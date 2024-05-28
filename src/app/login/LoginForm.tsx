"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H2 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

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
    setLoading(true);
    setShowSpinner(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log("here");
    const response = await action(formData);
    console.log(response);
    setLoading(false);

    if (response.status === 200) {
      router.push("/admin");
    } else {
      alert(response.message);
    }
  };

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
          className={cn(formErrors.password === "" ? "" : "input-error")}
        />
        {formErrors.password === "" ? null : (
          <span className="input-error-message">{formErrors.password}</span>
        )}
        <Button type="submit" className="admin-button" disabled={loading}>
          {showSpinner && (
            // EXPLANATION: We need a div here since duration-300 affects animate-spin
            <div
              className={cn(
                "transition-opacity duration-300 ease-in-out",
                loading ? "opacity-100" : "opacity-0",
              )}
              onTransitionEnd={onTransitionEnd}
            >
              <Loader2 className={cn("right-0 mr-2 h-4 w-4 animate-spin")} />
            </div>
          )}
          Login
        </Button>
      </form>
    </div>
  );
}
