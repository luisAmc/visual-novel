import { type ReactNode } from "react";
import { StatementFrame } from "./StatementFrame";
import { motion } from "framer-motion";
import { FrameAnimationVariants } from "./Frame";

const FRAME_NAME = "screen_text";

const AnimationVariants: FrameAnimationVariants = {
  initial: {
    opacity: 0,
  },
  entrance: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

interface ScreenTextProps {
  children: ReactNode;
}

export function ScreenText({ children }: ScreenTextProps) {
  return (
    <StatementFrame name={FRAME_NAME}>
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={AnimationVariants}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
            <div className="px-12 py-8 text-5xl">{children}</div>
          </div>
        </motion.div>
      )}
    </StatementFrame>
  );
}
