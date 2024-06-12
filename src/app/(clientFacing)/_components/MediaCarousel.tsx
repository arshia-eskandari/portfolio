import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

interface MediaCarouselProps {
  media: string[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ media }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    setDragStartX(event.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const dx = event.clientX - dragStartX;
      let newTranslateX = translateX + dx;

      if (currentMediaIndex === 0 && newTranslateX > 0) {
        newTranslateX = 0;
      }

      if (currentMediaIndex === media.length - 1 && newTranslateX < 0) {
        newTranslateX = 0;
      }

      setTranslateX(newTranslateX);
      setDragStartX(event.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = containerRef.current
      ? containerRef.current.offsetWidth / 4
      : 0;

    if (translateX > threshold && currentMediaIndex > 0) {
      setCurrentMediaIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (
      translateX < -threshold &&
      currentMediaIndex < media.length - 1
    ) {
      setCurrentMediaIndex((prevIndex) =>
        Math.min(prevIndex + 1, media.length - 1),
      );
    }
    setTranslateX(0);
  };

  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) => {
      if (prevIndex === 0) {
        return media.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => {
      if (prevIndex === media.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    setDragStartX(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (isDragging && event.touches && event.touches.length > 0) {
      const touch = event.touches[0];
      const dx = touch.clientX - dragStartX;
      let newTranslateX = translateX + dx;

      // Prevent dragging beyond the first and last items
      if (currentMediaIndex === 0 && newTranslateX > 0) newTranslateX = 0;
      if (currentMediaIndex === media.length - 1 && newTranslateX < 0)
        newTranslateX = 0;

      setTranslateX(newTranslateX);
      setDragStartX(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = containerRef.current
      ? containerRef.current.offsetWidth / 4
      : 0;

    if (translateX > threshold && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else if (
      translateX < -threshold &&
      currentMediaIndex < media.length - 1
    ) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
    setTranslateX(0);
  };

  return (
    <div
      className="relative h-[500px] w-1/2 overflow-hidden rounded-sm"
      ref={containerRef}
    >
      <div
        className={cn(
          "flex transition-transform duration-300 ease-out",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{
          transform: `translateX(${
            -currentMediaIndex * 100 +
            (isDragging
              ? (translateX / (containerRef.current?.offsetWidth ?? 1)) * 100
              : 0)
          }%)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
        className="absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform p-2 pr-6 text-white shadow-lg hover:shadow-left-inner"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform p-2 pl-6 text-white shadow-lg hover:shadow-right-inner"
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
      <div className="absolute left-5 top-5 z-20 text-white">
        {currentMediaIndex + 1}/{media.length}
      </div>
    </div>
  );
};

export default MediaCarousel;