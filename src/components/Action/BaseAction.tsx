import {
  AnimatePresence,
  AnimationControls,
  Variant,
  useAnimation,
  usePresence
} from 'framer-motion';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { motion } from 'framer-motion';
import { useScene } from '../Scene/SceneContext';
import { StatementType, useStatement } from '../Statement/StatementContext';
import { useIsMounted } from '@react-hookz/web';
import clsx from 'clsx';
import useSound from 'use-sound';

export type BaseActionAnimation = {
  initial: Variant;
  entrance: Variant;
  exit: Variant;
};

export interface BaseActionInstance {
  enter: () => void;
  pause: () => void;
  resume: () => void;
}

export interface BaseActionProps {
  zIndex: number | 'auto';
  statementType: StatementType;
  audioControls?: ReturnType<typeof useSound>[0];
  children: (control: AnimationControls) => ReactNode;
}

export const BaseAction = forwardRef(function BaseAction(
  { statementType, zIndex, audioControls, children }: BaseActionProps,
  ref
) {
  const controls = useAnimation();

  const { goToNextStatement } = useScene();
  const { statementIndex, focused } = useStatement();

  const [isPresent, safeToRemove] = usePresence();
  const isMounted = useIsMounted();

  const enteredRef = useRef(false);
  const [entered, _setEntered] = useState(false);
  const setEntered = useCallback((newEntered: boolean) => {
    enteredRef.current = newEntered;
    _setEntered(newEntered);
  }, []);

  const [countdownProgress, setCountdownProgress] = useState(0);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval>>();

  useImperativeHandle(
    ref,
    (): BaseActionInstance => ({
      enter: () => {
        if (enteredRef.current) {
          return false;
        }

        controls.stop();
        controls.set('entrance');
        setEntered(true);

        return true;
      },
      pause: () => {},
      resume: () => {}
    })
  );

  useEffect(() => {
    if (isPresent) {
      setEntered(false);

      requestAnimationFrame(() =>
        controls.start('entrance').then(() => setEntered(true))
      );

      audioControls?.();
    } else {
      controls.start('exit').then(() => safeToRemove());
    }

    return () => controls.stop();
  }, [isPresent]);

  useEffect(() => {
    if (statementType.variation === 'skippable_timed' && entered && focused) {
      setCountdownProgress(0);

      countdownTimerRef.current = setInterval(() => {
        if (isMounted()) {
          setCountdownProgress((prev) => prev + 1);
        } else if (countdownTimerRef.current) {
          countdownTimerRef.current = undefined;
        }
      }, statementType.durationMs / 100);
    }
  }, [entered, focused]);

  useEffect(() => {
    if (countdownProgress === 100) {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = undefined;
      }

      if (focused) {
        goToNextStatement();
      }
    }
  }, [countdownProgress]);

  return (
    <div
      className='absolute inset-0 flex'
      style={{ zIndex: zIndex === 'auto' ? statementIndex : zIndex }}
    >
      {children(controls)}

      <AnimatePresence>
        {statementType.variation === 'skippable_timed' && focused && (
          <motion.progress
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            value={countdownProgress}
            max={100}
            className={clsx(
              'absolute left-0 top-0 z-[100] h-1 w-full appearance-none rounded-none',
              '[&::-moz-progress-bar]:bg-emerald-500',
              '[&::-webkit-progress-bar]:rounded-none [&::-webkit-progress-bar]:bg-emerald-500/20',
              '[&::-webkit-progress-value]:rounded-none [&::-webkit-progress-value]:bg-emerald-500'
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
