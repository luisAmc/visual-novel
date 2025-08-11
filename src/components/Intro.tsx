"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useScrollLock from "~/hooks/useScrollLock";

gsap.registerPlugin(useGSAP);

export function Intro() {
  const { unlock } = useScrollLock();

  const containerRef = useRef<HTMLDivElement>(null);
  const staticTitleRef = useRef<HTMLDivElement>(null);
  const animatedTitleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!staticTitleRef.current || !animatedTitleRef.current) return;

      gsap.set(animatedTitleRef.current, { x: 0, y: 0, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: unlock,
      });

      tl.to(animatedTitleRef.current, {
        y: -20,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      })
        .to(animatedTitleRef.current, {
          top: 68,
          duration: 1,
          ease: "power3.inOut",
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          display: "none",
          ease: "power2.out",
        })
        .to(
          animatedTitleRef.current,
          {
            opacity: 0,
            duration: 0.1,
            dislay: "none",
            ease: "power3.out",
          },
          "<"
        );
    },
    { scope: containerRef }
  );

  return (
    <Fragment>
      <div ref={containerRef} className="flex flex-col px-8 pt-12 lg:pb-28">
        <div
          ref={staticTitleRef}
          className="top-[48px] uppercase font-medium mb-4 text-heading-1"
        >
          Novelas Visuales
        </div>

        <div>
          <div className="uppercase text-heading-3 font-extralight lg:border-t lg:border-b lg:px-8 w-fit tracking-wider">
            Una antología
          </div>
        </div>

        <div ref={overlayRef} className="absolute inset-0 bg-[#101010]"></div>

        <div
          ref={animatedTitleRef}
          className="pointer-events-none absolute uppercase font-medium opacity-0 text-heading-1 bottom-[12vh] left-8 text-[#e8e8e3]"
        >
          Novelas Visuales
        </div>
      </div>
    </Fragment>
  );
}
