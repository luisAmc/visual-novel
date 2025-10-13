"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Action } from "~/components/Action";
import { useScene } from "~/components/Scene/SceneContext";
import { useMobileBounds } from "./useMobileBounds";

interface PhotoProps {
  src: string;
  children: ReactNode;
}

export function Photo({ src, children }: PhotoProps) {
  return (
    <Action name="Photo">
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: 1 },
            },
            exit: {
              opacity: 0,
              transition: {
                delay: 1,
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center justify-center h-full "
        >
          {children}
        </motion.div>
      )}
    </Action>
  );
}

export function Target() {
  const { rect, ratio: heightRatio, isMD } = useMobileBounds();

  const widthRatio = rect?.width ?? 0 / 212;

  const ratio = isMD ? widthRatio : heightRatio;

  console.log("From target::", { rect, ratio, isMD });

  const { goToNextStatement } = useScene();

  return (
    <button
      onClick={() => goToNextStatement()}
      className="bg-emerald-400/30 group flex items-center justify-center relative z-20"
      // className="bg-emerald-400/30 w-[30.8%] h-[37%] top-[43.4%] left-[23.3%] group flex items-center justify-center relative z-20"
      style={
        isMD
          ? {
              top: ratio * 52,
              left: ratio * 61,
              width: ratio * 82,
              height: ratio * 163,
            }
          : {
              top: ratio * 48,
              left: ratio * 56.5,
              width: ratio * 74,
              height: ratio * 149,
            }
      }
    />
  );
}
