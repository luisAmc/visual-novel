import { Action } from '.';
import { motion } from 'framer-motion';

interface TextProps {
  children: string;
}

export function Text({ children }: TextProps) {
  return (
    <Action name='Text'>
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
          <div className='absolute inset-x-12 bottom-12 h-52 rounded-md bg-slate-800/80'>
            <div className='p-6 text-slate-50 text-lg'>{children}</div>
            <div className='absolute text-slate-50 text-xl animate-pulse right-12 bottom-12'>
              ▶
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
