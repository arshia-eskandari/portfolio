import Image from "next/image";

export default function FlexibleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      // EXPLANATION: A grid and padding bottom of 100% are required to adjust the size of next images
      className="relative w-full cursor-pointer pb-[100%]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="px-3 py-3 md:py-0"
        style={{ objectFit: "cover"}}
      />
    </div>
  );
}
