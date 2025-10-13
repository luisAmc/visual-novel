import { Action } from '.';
import { motion } from 'framer-motion';

interface BackgroundProps {
  src: string;
  durationMs?: number;
  instant?: boolean;
}

export function Background({
  src,
  durationMs = 500,
  instant = false
}: BackgroundProps) {
  return (
    <Action
      name='Background'
      statementType={{ variation: 'skippable_timed', durationMs }}
      until={(statement) =>
        statement.actionName === 'Background' ||
        statement.actionName === 'BlackScreen'
      }
    >
      {(controls) => (
        <motion.div
          animate={controls}
          initial='initial'
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: instant ? 0.1 : 1 }
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
        >
          <img src={src} alt='background' className='h-full aspect-video' />
        </motion.div>
      )}
    </Action>
  );
}
