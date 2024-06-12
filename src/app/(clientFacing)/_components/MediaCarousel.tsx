// components/MediaCarousel.tsx
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";

interface MediaCarouselProps {
  media: string[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ media }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length,
    );
  };

  const renderMedia = (mediaUrl: string) => {
    if (mediaUrl.match(/\.(jpeg|jpg|png)$/i)) {
      return (
        <div
          style={{
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
        ></div>
      );
    } else if (mediaUrl.endsWith(".mp4")) {
      return (
        <div className="flex h-[500px] w-full items-center justify-center">
          <ReactPlayer
            url={mediaUrl}
            controls={true}
            width="100%"
            height="100%"
            style={{ backgroundColor: "black", alignSelf: "center" }}
          />
        </div>
      );
    }
  };

  return (
    <div className="relative h-[500px] w-1/2 overflow-hidden rounded-sm">
      {renderMedia(media[currentMediaIndex])}
      <button
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default MediaCarousel;
