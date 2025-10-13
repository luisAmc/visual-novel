import { type ReactNode } from "react";
import { FrameAnimationVariants } from "./Frame";
import { StatementFrame } from "./StatementFrame";
import { motion } from "framer-motion";

const FRAME_NAME = "text";

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

interface TextProps {
  speaker?: string;
  children: ReactNode;
}

export function Text({ speaker, children }: TextProps) {
  return (
    <StatementFrame name={FRAME_NAME}>
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={AnimationVariants}
        >
          <div className="absolute inset-x-4 bottom-16 flex flex-col gap-y-0.5">
            <Speaker>{speaker}</Speaker>
            <TextBubble>{children}</TextBubble>
          </div>
        </motion.div>
      )}
    </StatementFrame>
  );
}

interface SpeakerProps {
  children?: string;
}

function Speaker({ children }: SpeakerProps) {
  if (!children) {
    return null;
  }

  return (
    <div className="w-fit bg-black/90 px-4 py-1 text-lg rounded-md">
      {children}
    </div>
  );
}

interface TextBubbleProps {
  children: ReactNode;
}

function TextBubble({ children }: TextBubbleProps) {
  return (
    <div className="flex bg-black/90 rounded-md">
      <div className="text-lg px-6 py-6 flex-1">{children}</div>

      <div className="flex items-end text-base animate-pulse p-4">▶</div>
    </div>
  );
}
