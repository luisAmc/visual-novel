import { Action } from '.';
import { motion } from 'framer-motion';
import { useGame } from '../Game/GameContext';
import { SceneId } from '../Game/GameState';

interface DecisionProps {
  options: Array<{ label: string; to?: SceneId }>;
  children: string;
}

export function Decision({ options, children }: DecisionProps) {
  const { goToScene } = useGame();

  return (
    <Action name='Decision'>
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
            <div className='text-7xl'>{children}</div>

            <div className='flex items-center justify-center gap-8'>
              {options.map((option) => (
                <motion.button
                  key={option.label}
                  onClick={(event) => {
                    if (option.to) {
                      event.stopPropagation();
                      goToScene(option.to);
                    }
                  }}
                  className='px-6 py-4 rounded-md bg-gray-700 hover:bg-opacity-80'
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
