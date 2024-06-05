"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { H4 } from "@/components/ui/Typography";

export default function DefaultExperienceForm({
  action,
}: {
  action: (formData: FormData) => Promise<any>;
}) {
  const [loading, setLoading] = useState(false);
  const [errorMssg, setErrorMssg] = useState<string>("");
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form className="my-3" onSubmit={actionWithLoading}>
      <div className="flex w-full items-center justify-between py-3">
        <H4>Experiences Section</H4>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Generate Default Experience
        </SubmitButton>
      </div>

      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
