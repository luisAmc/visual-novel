'use client';

import Link from 'next/link';

export function Stories() {
  const stories = [
    { title: 'Visita en el baño', href: '/bathroom-visit' },
    { title: 'Alguien toca la puerta', href: '/knock-on-the-door' },
    { title: 'El Paquete', href: '/the-package' },
  ];

  return (
    <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {stories.map(({ title, href }, index) => (
        <StoryCard key={href} index={index + 1} title={title} href={href} />
      ))}
    </div>
  );
}

interface StoryCardProps {
  index: number;
  title: string;
  href: string;
}

export function StoryCard({ index, title, href }: StoryCardProps) {
  return (
    <Link href={href}>
      <div className='flex flex-col gap-8 items-center justify-center px-6 py-4 rounded-lg border border-emerald-700 h-[350px] aspect-[5/6] bg-slate-700 hover:scale-105 transition-transform ease-in-out'>
        <div className='border p-3 rounded-full h-20 w-20 flex justify-center items-center text-4xl'>
          {index}
        </div>

        <div className='text-center text-4xl'>{title}</div>
      </div>
    </Link>
  );
}
