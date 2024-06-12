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
    setCurrentMediaIndex((prevIndex) => {
      return (prevIndex - 1 + media.length) % media.length;
    });
  };

  return (
    <div className="relative h-[500px] w-1/2 overflow-hidden rounded-sm">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentMediaIndex * 100}%)`,
        }}
      >
        {media.map((mediaUrl) => (
          <div key={mediaUrl} className="h-[500px] min-w-full flex-shrink-0">
            {mediaUrl.match(/\.(jpeg|jpg|png)$/i) ? (
              <div
                style={{
                  backgroundImage: `url(${mediaUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ReactPlayer
                  url={mediaUrl}
                  controls={true}
                  width="100%"
                  height="100%"
                  style={{ backgroundColor: "black", alignSelf: "center" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
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
      <div className="absolute bottom-5 left-5 z-20 text-white">
        {currentMediaIndex + 1}/{media.length}
      </div>
    </div>
  );
};

export default MediaCarousel;
