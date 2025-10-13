import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Action } from '~/components/Action';
import { useScene } from '~/components/Scene/SceneContext';

interface PointClickProps {
  src: string;
  children: ReactNode;
}

export function PointClick({ src, children }: PointClickProps) {
  return (
    <Action name='PointClick'>
      {(controls) => (
        <motion.div
          animate={controls}
          initial='initial'
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: 1 }
            },
            exit: {
              opacity: 0,
              transition: {
                delay: 1,
                duration: 0.5,
                ease: 'easeOut'
              }
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className='relative max-w-full h-full aspect-video'
            style={{ cursor: `url('/eye.png'),auto` }}
          >
            <img
              src={src}
              alt='background'
              className='absolute h-full aspect-video'
            />

            {children}
          </div>
        </motion.div>
      )}
    </Action>
  );
}

interface TargetProps {
  left: number;
  top: number;
}

export function Target({ left, top }: TargetProps) {
  const { goToNextStatement } = useScene();

  return (
    <button
      onClick={() => goToNextStatement()}
      className='group flex items-center justify-center absolute z-20 rounded-full w-[4%] aspect-square'
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <div className='bg-emerald-400 group-hover:bg-opacity-100 bg-opacity-40 rounded-full w-3 h-3 animate-ping group-hover:animate-none group-hover:w-4 group-hover:h-4 duration-2s'></div>
    </button>
  );
}
