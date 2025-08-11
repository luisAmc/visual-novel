import Image from "next/image";

export function Outro() {
  return (
    <div className="relative w-screen h-[20vh] sm:h-[30vh] p-8 flex items-center justify-center">
      <Image
        src="/outro.webp"
        alt="novels characters"
        width={500}
        height={500}
        className="absolute bottom-0 w-[100vw] md:w-[80vw] xl:w-[50vw] h-auto"
      />
    </div>
  );
}
