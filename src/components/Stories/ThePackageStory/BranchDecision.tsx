import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Action } from '~/components/Action';
import { useGame } from '~/components/Game/GameContext';
import { BranchId } from '~/components/Game/GameState';

interface BranchDecisionProps {
  options: Array<{ label: string; to?: BranchId; onClick?: () => void }>;
  children: ReactNode;
}

export function BranchDecision({ options, children }: BranchDecisionProps) {
  const { goToScene } = useGame();

  return (
    <Action name='BranchDecision'>
      {(controls) => (
        <motion.div
          animate={controls}
          initial='initial'
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: 0.3 }
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: 'easeOut'
              }
            }
          }}
        >
          <div className='absolute h-full w-full flex flex-col gap-y-12 items-center justify-center'>
            <div className='text-7xl text-slate-800 mb-12'>{children}</div>

            <div className='flex flex-col items-center justify-center gap-8 text-4xl'>
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
                  className='px-6 py-4 rounded-md bg-gray-800 hover:bg-gray-700'
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
