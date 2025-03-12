import Link from "next/link";
import { cn } from "~/utils/cn";

export function Stories() {
  const stories = [
    { title: "Visita en el baño", href: "/bathroom-visit" },
    { title: "Alguien toca la puerta", href: "/knock-on-the-door" },
    { title: "El Paquete", href: "/the-package" },
    { title: "Capture_AI", href: "/take-the-photo" },
  ];

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6">
      {stories.map(({ title, href }, i) => (
        <StoryCard key={href} number={i + 1} title={title} href={href} />
      ))}
    </div>
  );
}

interface StoryCardProps {
  number: number;
  title: string;
  href: string;
}

export function StoryCard({ number, title, href }: StoryCardProps) {
  return (
    <Link href={href}>
      {/* <div className="flex flex-col gap-8 items-center justify-center px-6 py-4 rounded-lg border border-emerald-700 h-[350px] aspect-[5/6] bg-slate-700 hover:scale-105 transition-transform ease-in-out"> */}
      <div
        className={cn(
          "hover:bg-white/15 transition-[background-color] min-h-96 flex flex-col bg-transparent p-6 rounded-lg border items-center justify-center gap-y-4"
        )}
      >
        <div className="border rounded-full size-12 flex justify-center items-center text-2xl">
          {number}
        </div>

        <div className="text-center text-2xl">{title}</div>
      </div>
    </Link>
  );
}
