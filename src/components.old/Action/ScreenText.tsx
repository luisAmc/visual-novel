import { ReactNode } from 'react';
import { Action } from '.';
import { motion } from 'framer-motion';

interface ScreenTextProps {
  children: ReactNode;
}

export function ScreenText({ children }: ScreenTextProps) {
  return (
    <Action name='ScreenText'>
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
          className='pointer-events-none absolute inset-0'
        >
          <div className='absolute inset-0 flex items-center justify-center bg-gray-950'>
            <div className='px-12 py-8 text-5xl'>{children}</div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
