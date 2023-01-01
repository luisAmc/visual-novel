import { useIsMounted } from '@react-hookz/web';
import {
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
import { useStatementContext } from '../Scene/StatementContext';

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
    children: (control: AnimationControls) => ReactNode;
}

export const ActionView = forwardRef(function ActionView(
    { children }: ActionViewProps,
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

    return <div className="h-full w-full">{children(controls)}</div>;
});
