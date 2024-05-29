"use client";
import React, { useState } from "react";
import { Media } from "@prisma/client";
import Image from "next/image";
import { Label } from "../../../../components/ui/label";
import { SubmitButton } from "../../../../components/ui/SubmitButton";
import { Checkbox } from "../../../../components/ui/Checkbox";
import { ErrorAlert } from "../../../../components/ui/ErrorAlert";
import { useRouter } from "next/navigation";

interface MediaGridProps {
  media: Media[];
  action: (formData: FormData) => Promise<any>;
}

function MediaGrid({ media, action }: MediaGridProps) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMssg, setErrorMssg] = useState<string>("");
  const router = useRouter();

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMssg("");
    setLoading(true);
    setShowSpinner(true);
    const form = event.currentTarget;
    console.log(form);
    const formData = new FormData(form);
    const response = await action(formData);
    setLoading(false);

    if (response.status === 204) {
      router.refresh();
    } else {
      console.log(response);
      setErrorMssg(response.message);
    }
  };

  return (
    <form
      className="flex w-full flex-wrap justify-between md:gap-x-[4.5%]"
      onSubmit={actionWithLoading}
    >
      <div className="flex w-full items-center justify-between py-3">
        <Label htmlFor="file" className="hover:cursor-pointer">
          Uploaded Files
        </Label>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
          variant="destructive"
        >
          Deleted Selected Files
        </SubmitButton>
      </div>
      {media.map((medium) => (
        <div
          key={medium.id}
          // EXPLANATION: The CSS trick for creating squares uses percentage-based padding calculated from
          // the parent's width. By setting both the width and padding-bottom of an element to the same percentage,
          // the element's height matches its width, forming a square. This takes advantage of CSS's rule that
          // percentage paddings are relative to the width, allowing for responsive square elements.
          className="relative w-full cursor-pointer pb-[100%] hover:opacity-80 sm:w-1/2 md:w-[30%] md:pb-[30%]"
        >
          <Checkbox
            name={medium.id}
            id={medium.id}
            value={medium.id}
            className="absolute right-2 top-2 z-20 bg-white"
          />
          <Image
            src={medium.url}
            alt={medium.name}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-sm text-white">
            {medium.name}
          </div>
        </div>
      ))}
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}

export default MediaGrid;
