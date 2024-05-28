"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

export default function MediaForm({
  action,
}: {
  action: (formData: FormData) => Promise<any>;
}) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMssg, setErrorMssg] = useState<string>("");

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
    <form className="my-3" onSubmit={actionWithLoading}>
      <div className="flex w-full items-center justify-between">
        <Label htmlFor="file" className="hover:cursor-pointer">
          Upload New File
        </Label>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Upload
        </SubmitButton>
      </div>
      <Input
        name="file"
        id="file"
        type="file"
        className="my-3 hover:cursor-pointer"
      />
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
