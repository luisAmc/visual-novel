import {
    useMountEffect,
    useSyncedRef,
    useUpdateEffect,
} from '@react-hookz/web';
import {
    AnimatePresence,
    AnimationControls,
    useUnmountEffect,
} from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import useEventCallback from 'use-event-callback';
import {
    Statement,
    StatementBehavior,
    useStatementContext,
} from '../Scene/StatementContext';
import { ActionView, ActionViewInstance } from './ActionView';

export interface ActionProps {
    name: string;
    showUntil?: number | ((statement: Statement) => boolean);
    next?: number | string;
    zIndex?: number | 'auto';
    behavior?: StatementBehavior;
    children: (controls: AnimationControls) => ReactNode;
}

export function Action({
    name: actionName,
    showUntil = 0,
    next = 1,
    zIndex = 'auto',
    behavior = ['skippable_static'],
    children,
}: ActionProps) {
    const { register, visible } = useStatementContext();

    const viewRef = useRef<ActionViewInstance>(null);

    useEffect(() => {
        register({
            actionName,
            behavior,
            showUntil,
            next,
            enter: () => viewRef.current?.enter() ?? false,
        });
    }, [actionName, showUntil, next, register]);

    const visibleRef = useSyncedRef(visible);
    const mountedRef = useRef(false);
    const handledStateRef = useRef<'visible' | 'hidden'>('hidden');

    const handleVisible = useEventCallback(async () => {
        if (handledStateRef.current === 'visible') {
            return;
        }

        handledStateRef.current = 'visible';
    });

    const handleHidden = useEventCallback(async () => {
        if (handledStateRef.current === 'hidden') {
            return;
        }

        handledStateRef.current = 'hidden';
    });

    useMountEffect(() => {
        if (mountedRef.current) {
            return;
        }

        mountedRef.current = true;

        setTimeout(() => {
            setTimeout(() => {
                if (!visibleRef.current || !mountedRef.current) {
                    return;
                }

                handleVisible();
            });
        });
    });

    useUnmountEffect(() => {
        if (!mountedRef.current) {
            return;
        }

        mountedRef.current = false;

        setTimeout(() => {
            if (mountedRef.current) {
                return;
            }

            handleHidden();
        });
    });

    useUpdateEffect(() => {
        if (visible) {
            setTimeout(() => {
                setTimeout(() => {
                    if (!visibleRef.current || !mountedRef.current) {
                        return;
                    }

                    handleVisible();
                });
            });
        } else {
            setTimeout(() => {
                if (visibleRef.current || !mountedRef.current) {
                    return;
                }

                handleHidden();
            });
        }
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <ActionView ref={viewRef} behavior={behavior} zIndex={zIndex}>
                    {children}
                </ActionView>
            )}
        </AnimatePresence>
    );
}
