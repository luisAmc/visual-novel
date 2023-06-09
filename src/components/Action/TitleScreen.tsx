import { Action } from '.';
import { motion } from 'framer-motion';

export function TitleScreen() {
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
            <div className='absolute inset-0 bg-gray-900/90'></div>
            <div className='absolute flex flex-col items-center'>
              <h1 className='text-8xl text-gray-50 uppercase'>
                Tengo que orinar...
              </h1>

              <div className='text-4xl'>
                — Esta experiencia usa sonidos, por favor suba el volumen —
              </div>

              <div className='mt-20 text-5xl'>Precione en cualquier lugar para continuar...</div>
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
