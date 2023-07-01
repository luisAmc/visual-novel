import { motion } from 'framer-motion';
import { Action } from '~/components/Action';

export function BlackScreen({ durationMs = 500 }: { durationMs?: number }) {
  return (
    <Action
      name='BlackScreen'
      statementType={{ variation: 'skippable_timed', durationMs }}
      until={(statement) =>
        statement.actionName === 'Background' ||
        statement.actionName === 'PointClick'
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
        >
          <div className='h-full bg-gray-900 aspect-video'></div>
        </motion.div>
      )}
    </Action>
  );
}
