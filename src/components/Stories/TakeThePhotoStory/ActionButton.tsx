import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Action } from "~/components/Action";
import { useGame } from "~/components/Game/GameContext";
import { BranchId } from "~/components/Game/GameState";

interface ActionButtonProps {
  to: BranchId;
  children: ReactNode;
}

export function ActionButton({ to, children }: ActionButtonProps) {
  const { goToScene } = useGame();

  return (
    <Action name="ActionButton">
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
        >
          <div className="h-full w-full absolute flex flex-col justify-center gap-y-12">
            <div className="px-4 justify-center flex flex-col gap-y-3 items-center">
              <motion.button
                onClick={(event) => {
                  if (to) {
                    event.stopPropagation();

                    goToScene(to);
                  }
                }}
                className="rounded-full p-12 size-44 flex items-center justify-center bg-gray-900 shadow-sm hover:bg-gray-700 text-2xl"
              >
                {children}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
