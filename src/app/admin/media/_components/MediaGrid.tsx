"use client";
import React, { useState } from "react";
import { Media, MediaType } from "@prisma/client";
import Image from "next/image";
import { Label } from "../../../../components/ui/label";
import { SubmitButton } from "../../../../components/ui/SubmitButton";
import { Checkbox } from "../../../../components/ui/Checkbox";
import { ErrorAlert } from "../../../../components/ui/ErrorAlert";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import ReactPlayer from "react-player";
import PDFViewer from "@/components/ui/PdfViewer";

interface MediaGridProps {
  media: Media[];
  action: (formData: FormData) => Promise<any>;
}

function MediaGrid({ media, action }: MediaGridProps) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMssg, setErrorMssg] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleImageClick = (media: Media) => {
    setSelectedMedia(media);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedMedia(null);
    }, 300); // Match the duration of the fadeOut animation
  };

  const renderMediaContent = (medium: Media) => {
    switch (medium.mediaType) {
      case MediaType.IMAGE:
        return (
          <Image
            src={medium.url}
            alt={medium.name}
            width={800}
            height={600}
            style={{ objectFit: "contain" }}
          />
        );
      case MediaType.VIDEO:
        return (
          <div className="flex h-[600px] w-[350px] items-center justify-center md:w-[650px]">
            <ReactPlayer
              url={medium.url}
              controls={true}
              width="100%"
              height="100%"
              style={{ backgroundColor: "black", alignSelf: "center" }}
            />
          </div>
        );
      case MediaType.PDF:
        return <PDFViewer fileUrl={medium.url} />;
      default:
        return null;
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
      <div className="mb-3 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {media.map((medium) => (
          <div
            onClick={() => handleImageClick(medium)}
            key={medium.id}
            // EXPLANATION: The CSS trick for creating squares uses percentage-based padding calculated from
            // the parent's width. By setting both the width and padding-bottom of an element to the same percentage,
            // the element's height matches its width, forming a square. This takes advantage of CSS's rule that
            // percentage paddings are relative to the width, allowing for responsive square elements.
            className="relative w-full cursor-pointer pb-[100%] hover:opacity-80"
          >
            <Checkbox
              name={medium.id}
              id={medium.id}
              value={medium.id}
              className="absolute right-2 top-2 z-20 bg-white"
              // EXPLANATION: When clicking on the checkbox the modal should not appear
              onClick={(e) => e.stopPropagation()}
            />
            {medium.mediaType === MediaType.VIDEO ? (
              <Image
                src={"/vid.svg"}
                alt={medium.name}
                fill
                className="bg-zinc-500"
                style={{ objectFit: "cover" }}
              />
            ) : medium.mediaType === MediaType.PDF ? (
              <Image
                src={"/pdf.svg"}
                alt={medium.name}
                fill
                className="bg-zinc-500"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Image
                src={medium.url}
                alt={medium.name}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
            <div
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-sm text-white"
              // EXPLANATION: When clicking on the checkbox the modal should not appear
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={medium.url}
                // EXPLANATION: When clicking on the checkbox the modal should not appear
                onClick={(e) => e.stopPropagation()}
                className="flex"
              >
                <Download className="mx-3 inline-block" />
                {medium.name}
              </a>
            </div>
          </div>
        ))}
      </div>
      <ErrorAlert errorMssg={errorMssg} />
      {selectedMedia && (
        <div
          className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-75 ${
            isVisible ? "animate-fade-in" : "animate-fade-out"
          }`}
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {renderMediaContent(selectedMedia)}
          </div>
        </div>
      )}
    </form>
  );
}

export default MediaGrid;
