import { FrameAnimationVariants } from "./Frame";
import { AudioSource, StatementFrame } from "./StatementFrame";
import { motion } from "framer-motion";

const FRAME_NAME = "background";

const AnimationVariants: FrameAnimationVariants = {
  initial: {
    opacity: 0,
  },
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
};

interface BackgroundProps {
  src: string;
  audio?: AudioSource;
  durationMs?: number;
}

export function Background({ src, audio, durationMs = 500 }: BackgroundProps) {
  return (
    <StatementFrame
      name={FRAME_NAME}
      type={{ variation: "skippable_timed", durationMs }}
      shownUntil={(statement) => statement.frameName === FRAME_NAME}
      audio={audio}
    >
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={AnimationVariants}
          className="flex items-center justify-center h-full"
        >
          <img src={src} alt="background" className="w-screen h-auto" />
        </motion.div>
      )}
    </StatementFrame>
  );
}
