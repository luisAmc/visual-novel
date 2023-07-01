import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CHILLER_FONT } from '~/app/layout';
import { Action } from '~/components/Action';

interface TextProps {
  speaker?: string;
  children: string;
}

export function CreepyText({ children, speaker }: TextProps) {
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
          className={clsx(
            CHILLER_FONT.className,
            'text-red-500 pointer-events-none select-none absolute inset-0'
          )}
        >
          <div className='absolute inset-x-12 bottom-12 h-52 rounded-md bg-gray-700/95'>
            <div className='px-12 py-8 text-6xl leading-snug tracking-widest'>
              {children}
            </div>
            <div className='absolute text-xl animate-pulse right-12 bottom-12'>
              ▶
            </div>
          </div>

          {speaker && (
            <div className='absolute left-16 bottom-64 px-3 py-2 rounded-md bg-slate-800/90 tracking-widest uppercase text-5xl'>
              {speaker}
            </div>
          )}
        </motion.div>
      )}
    </Action>
  );
}
