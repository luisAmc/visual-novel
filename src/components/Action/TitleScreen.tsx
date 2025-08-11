import { ReactNode } from 'react';
import { Action } from '.';
import { motion } from 'framer-motion';

interface TitleScreenProps {
  children: ReactNode;
}

export function TitleScreen({ children }: TitleScreenProps) {
  return (
    <Action name='TitleScreen'>
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
          <div className='absolute h-full w-full flex items-center justify-center'>
            <div className='absolute inset-0 bg-gray-950'></div>
            <div className='absolute flex flex-col items-center'>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
