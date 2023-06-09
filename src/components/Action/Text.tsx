import { Action } from '.';
import { motion } from 'framer-motion';

interface TextProps {
  src?: string;
  children: string;
}

export function Text({ children, src }: TextProps) {
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
          {src && <img src={src} alt='background' className='shadow-md shadow-gray-700' />}

          <div className='absolute inset-x-12 bottom-12 h-52 rounded-md bg-slate-800/80'>
            <div className='px-12 py-8 text-5xl'>{children}</div>
            <div className='absolute text-xl animate-pulse right-12 bottom-12'>
              ▶
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
