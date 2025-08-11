"use client";

import { useEffect, useState } from "react";

export function DotCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setTimeout(() => {
        setPosition({ x: mouseX - 7, y: mouseY - 7 });
        setIsVisible(true);
      }, 10);
    });
  }, []);

  return (
    <div
      className="hidden sm:flex size-4 bg-[#e8e8e3] rounded-full pointer-events-none z-10 mix-blend-difference"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.1s, opacity 0.2s",
      }}
    ></div>
  );
}
