import { Action } from '.';
import { useGame } from '../Game/GameContext';
import { motion } from 'framer-motion';

export function ChangeScene({ to }: { to: string }) {
  const { goToScene } = useGame();

  return (
    <Action name='ChangeScene'>
      {(controls) => (
        <motion.button
          animate={controls}
          initial='initial'
          variants={{
            initial: { opacity: 0 },
            entrance: { opacity: 1 },
            exit: { opacity: 0 }
          }}
          onClick={() => goToScene(to)}
          className='z-20 rounded-md bg-gray-800/60 text-gray-50 px-3 py-2'
        >
          {to}
        </motion.button>
      )}
    </Action>
  );
}