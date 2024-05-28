import React from "react";
import { Media } from "@prisma/client";
import Image from "next/image";

function Thumbnail({ file }: { file: Media }) {
  const fileExtension = file.filePath.split(".").pop()?.toLowerCase();

  switch (fileExtension) {
    case "jpg":
    case "png":
    case "gif":
      return (
        <Image
          src={file.filePath}
          alt={file.name}
          layout="responsive"
          width={100}
          height={100}
        />
      );
    case "pdf":
      return (
        <div className="flex h-full items-center justify-center">PDF Icon</div>
      );
    case "mp4":
    case "mov":
      return (
        <div className="flex h-full items-center justify-center">
          Video Icon
        </div>
      );
    default:
      return <div>Unknown File Type</div>;
  }
}

type MediaGridProps = {
  mediaFiles: Media[];
};

function MediaGrid({ mediaFiles }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {mediaFiles.map((file) => (
        <div key={file.id} className="relative">
          {/* Handle different file types differently */}
          <Thumbnail file={file} />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
            {file.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MediaGrid;
