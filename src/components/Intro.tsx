"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function Intro() {
  if (typeof window === undefined) {
    return;
  }

  const staticTitleRef = useRef<HTMLDivElement>(null);
  const animatedTitleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!staticTitleRef.current || !animatedTitleRef.current) return;

    const fromRect = animatedTitleRef.current.getBoundingClientRect();
    const toRect = staticTitleRef.current.getBoundingClientRect();

    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    gsap.set(animatedTitleRef.current, { opacity: 0 });
    gsap.set(staticTitleRef.current, { opacity: 0 });

    const tl = gsap.timeline();

    tl.to(animatedTitleRef.current, {
      y: -20,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    })
      .to(animatedTitleRef.current, {
        x: deltaX,
        y: deltaY,
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }
        // "-=0.5"
      )
      .to(
        staticTitleRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "-=0.5"
      )
      .to(
        animatedTitleRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
        },
        "-=0.5"
      );
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center">
        <div
          ref={staticTitleRef}
          className="mt-12 text-[clamp(2.3rem,10vw,20rem)]"
        >
          Novelas Visuales
        </div>

        <div className="border-t border-b px-8 tracking-wider">
          una antología
        </div>

        <div ref={overlayRef} className="absolute inset-0 bg-gray-950"></div>

        <div
          ref={animatedTitleRef}
          className="absolute opacity-0 text-[clamp(2.3rem,10vw,20rem)] bottom-8 left-8"
        >
          Novelas Visuales
        </div>
      </div>
    </Fragment>
  );
}
