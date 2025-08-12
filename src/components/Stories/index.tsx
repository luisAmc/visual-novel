"use client";

import Link from "next/link";
import { useDotCursor } from "~/hooks/useDotCursor";

const stories = [
  {
    title: "Visita en el baño",
    href: "/bathroom-visit",
  },
  {
    title: "Alguien toca la puerta",
    href: "/knock-on-the-door",
  },
  { title: "El Paquete", href: "/the-package" },
  { title: "CaptureAI", href: "/take-the-photo" },
];

export function Stories() {
  return (
    <div className="bg-[#101010] sm:m-1 p-8 pt-12 sm:rounded-t-4xl sm:rounded-b-4xl">
      <h2 className="text-heading-2 text-[#e8e8e3] mb-12">
        Historias (0{stories.length})
      </h2>

      <ul>
        {stories.map((novel, i) => (
          <NovelCard key={novel.href} index={i} {...novel} />
        ))}
      </ul>
    </div>
  );
}

interface NovelCardProps {
  title: string;
  href: string;
  index: number;
}

function NovelCard({ index, title, href }: NovelCardProps) {
  const { isHovering } = useDotCursor();

  return (
    <Link href={href}>
      <li
        className="cursor-pointer border-t-[1px] border-[rgba(57,54,50,1)] text-[#e8e8e3] py-20 flex justify-between px-4 group"
        onMouseEnter={() => isHovering(true)}
        onMouseLeave={() => isHovering(false)}
      >
        <div className="flex items-center gap-x-6 group-hover:mx-8 transition-[margin]">
          <span className="text-base">(0{index + 1})</span>
          <header className="text-heading-3">{title}</header>
        </div>
      </li>
    </Link>
  );
}
