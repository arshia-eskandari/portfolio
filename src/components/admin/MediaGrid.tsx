"use client";
import React, { useEffect, useState } from "react";
import { Media } from "@prisma/client";
import Image from "next/image";
import { Label } from "../ui/label";
import { SubmitButton } from "../ui/SubmitButton";
import { Checkbox } from "../ui/Checkbox";

interface MediaGridProps {
  media: Media[];
}

function MediaGrid({ media }: MediaGridProps) {
  const [filesDeleteState, setFilesDeleteState] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const newFilesDeleteState: { [key: string]: boolean } = {};
    media.forEach(({ id }) => (newFilesDeleteState[id] = false));
  }, [media]);

  return (
    <div className="flex w-full flex-wrap justify-between md:gap-x-[4.5%]">
      <div className="flex w-full items-center justify-between py-3">
        <Label htmlFor="file" className="hover:cursor-pointer">
          Uploaded Files
        </Label>
        <SubmitButton
          loading={false}
          showSpinner={false}
          onTransitionEnd={() => {}}
          variant="destructive"
        >
          Deleted Selected Files
        </SubmitButton>
      </div>
      {media.map((medium) => (
        <button
          key={medium.id}
          // EXPLANATION: The CSS trick for creating squares uses percentage-based padding calculated from
          // the parent's width. By setting both the width and padding-bottom of an element to the same percentage,
          // the element's height matches its width, forming a square. This takes advantage of CSS's rule that
          // percentage paddings are relative to the width, allowing for responsive square elements.
          className="relative w-full cursor-pointer pb-[100%] hover:opacity-80 sm:w-1/2 md:w-[30%] md:pb-[30%]"
        >
          <Checkbox
            checked={filesDeleteState[medium.id]}
            onCheckedChange={(checked) => {
              const newFilesDeleteState: { [key: string]: boolean } = {
                ...filesDeleteState,
              };
              if (checked) {
                newFilesDeleteState[medium.id] = true;
              } else {
                newFilesDeleteState[medium.id] = false;
              }
              setFilesDeleteState(newFilesDeleteState);
            }}
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
        </button>
      ))}
    </div>
  );
}

export default MediaGrid;
