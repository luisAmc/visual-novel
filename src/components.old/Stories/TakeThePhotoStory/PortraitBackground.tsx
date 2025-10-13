import { motion } from "framer-motion";
import { Action } from "~/components/Action";

interface BackgroundProps {
  src: string;
  durationMs?: number;
  instant?: boolean;
  entranceDuration?: number;
}

export function PortraitBackground({
  src,
  durationMs = 500,
  instant = false,
  entranceDuration = 1,
}: BackgroundProps) {
  return (
    <Action
      name="PortraitBackground"
      statementType={{ variation: "skippable_timed", durationMs }}
      until={(statement) =>
        statement.actionName === "PortraitBackground" ||
        statement.actionName === "BlackScreen"
      }
    >
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: instant ? 0.1 : entranceDuration },
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
          className="flex items-center justify-center h-full "
        >
          <img src={src} alt="" className="max-w-none w-full" />
        </motion.div>
      )}
    </Action>
  );
}
