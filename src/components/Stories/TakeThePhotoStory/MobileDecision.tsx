import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Action } from "~/components/Action";
import { useGame } from "~/components/Game/GameContext";
import { BranchId } from "~/components/Game/GameState";

interface MobileDecisionProps {
  options: Array<{ label: string; to?: BranchId; onClick?: () => void }>;
  children?: ReactNode;
}

export function MobileDecision({ options, children }: MobileDecisionProps) {
  const { goToScene } = useGame();

  return (
    <Action name="MobileDecision">
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
          <div className="px-2 absolute flex flex-col bottom-16 w-full justify-center">
            <div className="w-full px-4 py-6 rounded-xl bg-gray-950/35 flex flex-col justify-center gap-y-8">
              {children && (
                <div className="flex items-center text-center font-medium justify-center text-2xl text-gray-950">
                  {children}
                </div>
              )}

              <div className="justify-center flex flex-col gap-y-3 items-center">
                {options.map((option) => (
                  <motion.button
                    key={option.label}
                    onClick={(event) => {
                      if (option.to) {
                        event.stopPropagation();

                        goToScene(option.to);
                      }

                      option.onClick?.();
                    }}
                    className="h-fit w-full text-start px-4 py-3 rounded-md bg-gray-950/80 shadow-sm hover:bg-gray-700 text-lg"
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
