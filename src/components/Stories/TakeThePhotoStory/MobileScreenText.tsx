import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Action } from "~/components/Action";

interface ScreenTextProps {
  children: ReactNode;
}

export function MobileScreenText({ children }: ScreenTextProps) {
  return (
    <Action name="MobileScreenText">
      {(controls) => (
        <motion.div
          animate={controls}
          initial="initial"
          variants={{
            initial: { opacity: 0 },
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
          }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 flex flex-col text-lg px-12 items-center justify-center gap-y-4 bg-gray-950/90">
            {children}
          </div>
        </motion.div>
      )}
    </Action>
  );
}
