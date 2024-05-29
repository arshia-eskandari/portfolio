"use client";
import React, { useEffect, useState } from "react";
import { Media } from "@prisma/client";
import Image from "next/image";

interface MediaGridProps {
  media: Media[];
}

function MediaGrid({ media }: MediaGridProps) {
  return (
    <div className="w-full flex justify-between flex-wrap md:gap-x-[4.5%] pt-3">
      {media.map((medium) => (
        <div
          key={medium.id}
          // EXPLANATION: The CSS trick for creating squares uses percentage-based padding calculated from 
          // the parent's width. By setting both the width and padding-bottom of an element to the same percentage,
          // the element's height matches its width, forming a square. This takes advantage of CSS's rule that 
          // percentage paddings are relative to the width, allowing for responsive square elements.
          className="relative cursor-pointer hover:opacity-80 w-full pb-[100%] sm:w-1/2 md:w-[30%] md:pb-[30%]"
        >
          <Image
            src={medium.url}
            alt={medium.name}
            fill
            style={{objectFit:"cover"}}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-sm text-white">
            {medium.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MediaGrid;
