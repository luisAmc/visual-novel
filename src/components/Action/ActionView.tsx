import { useIsMounted, useSyncedRef } from '@react-hookz/web';
import clsx from 'clsx';
import {
    AnimatePresence,
    AnimationControls,
    useAnimation,
    usePresence,
    Variant,
} from 'framer-motion';
import {
    forwardRef,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useSceneContext } from '../Scene/SceneContext';
import {
    StatementBehavior,
    useStatementContext,
} from '../Scene/StatementContext';
import { motion } from 'framer-motion';

export type ActionViewAnimation = {
    initial: Variant;
    entrance: Variant;
    exit: Variant;
};

export interface ActionViewInstance {
    enter: () => void;
    pause: () => void;
    resume: () => void;
}

interface ActionViewProps {
    zIndex: number | 'auto';
    behavior: StatementBehavior;
    children: (control: AnimationControls) => ReactNode;
}

export const ActionView = forwardRef(function ActionView(
    { children, behavior }: ActionViewProps,
    ref
) {
    const { goToNextStatement } = useSceneContext();
    const { statementIndex, focused } = useStatementContext();
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
    const countdownPausedRef = useRef(false);

    const windowFocused = useWindowFocus();
    const windowFocusedRef = useSyncedRef(windowFocused);

    const controls = useAnimation();

    useImperativeHandle(
        ref,
        (): ActionViewInstance => ({
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
            resume: () => {},
        })
    );

    useEffect(() => {
        if (isPresent) {
            setEntered(false);

            requestAnimationFrame(() =>
                requestAnimationFrame(() =>
                    controls.start('entrance').then(() => setEntered(true))
                )
            );
        } else {
            controls.start('exit').then(() => safeToRemove?.());
        }

        return () => controls.stop();
    }, [isPresent]);

    useEffect(() => {
        if (behavior[0] === 'skippable_timed' && entered && focused) {
            setCountdownProgress(0);
            countdownTimerRef.current = setInterval(() => {
                if (countdownPausedRef.current || !windowFocusedRef.current) {
                    return;
                }

                if (isMounted()) {
                    setCountdownProgress((prev) => prev + 1);
                } else if (countdownTimerRef.current) {
                    clearInterval(countdownTimerRef.current);
                    countdownTimerRef.current = undefined;
                }
            }, behavior[1].durationMs / 100);
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
        <div className="h-full w-full">
            <AnimatePresence>
                {behavior[0] === 'skippable_timed' && focused && (
                    <motion.progress
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        value={countdownProgress}
                        max={100}
                        className={clsx(
                            'absolute bottom-0 z-[100] h-1 w-full appearance-none rounded-none',
                            '[&::-moz-progress-bar]:bg-slate-500',
                            '[&::-webkit-progress-bar]:rounded-none [&::-webkit-progress-bar]:bg-slate-500/20',
                            '[&::-webkit-progress-value]:rounded-none [&::-webkit-progress-value]:bg-slate-500'
                        )}
                    />
                )}
            </AnimatePresence>

            {children(controls)}
        </div>
    );
});

function hasFocus() {
    return typeof document !== 'undefined' && document.hasFocus();
}

export function useWindowFocus() {
    const [focused, setFocused] = useState(hasFocus);
    useEffect(() => {
        setFocused(hasFocus());
        function onFocus() {
            return setFocused(true);
        }
        function onBlur() {
            return setFocused(false);
        }
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);

    return focused;
}
