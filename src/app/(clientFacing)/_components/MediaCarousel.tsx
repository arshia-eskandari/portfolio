import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
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
  const [width, setWidth] = useState(0);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedUrl(null);
    }, 300); // Match the duration of the fadeOut animation
  };

  const renderUrlContent = (url: string) => {
    return (
      <Image
        src={url}
        alt={`expanded-${url?.split("/")?.pop()?.split(".")[0]}`}
        width={800}
        height={600}
        style={{ objectFit: "contain" }}
      />
    );
  };

  const handleImageClick = (url: string) => {
    setSelectedUrl(url);
    setIsVisible(true);
  };

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
      className="relative h-[500px] overflow-hidden rounded-sm bg-black lg:w-1/2"
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
        {media.map((mediaUrl, index) => (
          <div key={mediaUrl} className="h-[500px] min-w-full flex-shrink-0">
            {mediaUrl.match(/\.(jpeg|jpg|png)$/i) ? (
              <div
                className="flex h-full items-center justify-center hover:cursor-pointer"
                onClick={() => {
                  if (!isDragging) {
                    setSelectedUrl(mediaUrl);
                    setIsVisible(true);
                  }
                }}
              >
                <Image
                  // EXPLANATION: This removes the drag conflict for images
                  draggable="false"
                  src={mediaUrl}
                  width={width}
                  height={500}
                  objectFit="cover"
                  className="self-center"
                  alt={
                    mediaUrl?.split("/")?.pop()?.split(".")[0] ||
                    `image-${index}`
                  }
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ReactPlayer
                  url={mediaUrl}
                  controls={true}
                  width={width}
                  height="100%"
                  style={{ backgroundColor: "black", alignSelf: "center" }}
                  onError={(e) => console.log(e)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="group absolute left-0 top-1/2 z-10 hidden h-2/3 -translate-y-1/2 transform p-2 pr-6 text-white lg:block"
        onClick={handlePrev}
      >
        <ChevronLeft className="transition-transform duration-300 ease-in-out group-hover:scale-[1.2] group-hover:brightness-125" />
      </button>
      <button
        className="group absolute right-0 top-1/2 z-10 hidden h-2/3 -translate-y-1/2 transform p-2 pl-6 text-white lg:block"
        onClick={handleNext}
      >
        <ChevronRight className="transition-transform duration-300 ease-in-out group-hover:scale-[1.2] group-hover:brightness-125" />
      </button>
      <div className="absolute left-5 top-5 z-20 text-white">
        {currentMediaIndex + 1}/{media.length}
      </div>
      {selectedUrl && (
        <div
          className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-75 ${
            isVisible ? "animate-fade-in" : "animate-fade-out"
          }`}
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {renderUrlContent(selectedUrl)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
