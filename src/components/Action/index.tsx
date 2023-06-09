'use client';

import { AnimatePresence, AnimationControls } from 'framer-motion';
import {
  Statement,
  StatementType,
  useStatement
} from '../Statement/StatementContext';
import { ReactNode, useEffect, useRef } from 'react';
import { BaseAction, BaseActionInstance, BaseActionProps } from './BaseAction';
import { useMountEffect, useUnmountEffect } from '@react-hookz/web';

export interface ActionProps
  extends Partial<Pick<Statement, 'step' | 'until'>>,
    Pick<BaseActionProps, 'audioControls'> {
  name: string;
  zIndex?: number | 'auto';
  statementType?: StatementType;
  children: (controls: AnimationControls) => ReactNode;
}

export function Action({
  name: actionName,
  until = 0,
  step = 1,
  zIndex = 'auto',
  statementType = { variation: 'skippable_static' },
  audioControls,
  children
}: ActionProps) {
  const { register, visible } = useStatement();

  const viewRef = useRef<BaseActionInstance>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    register({
      actionName,
      type: statementType,
      until,
      step,
      enter: () => viewRef.current?.enter() ?? false
    });
  }, [actionName, until, step, register]);

  useMountEffect(() => {
    if (mountedRef.current) {
      return;
    }

    mountedRef.current = true;
  });

  useUnmountEffect(() => {
    if (!mountedRef.current) {
      return;
    }

    mountedRef.current = false;
  });

  return (
    <AnimatePresence>
      {visible && (
        <BaseAction
          ref={viewRef}
          zIndex={zIndex}
          statementType={statementType}
          audioControls={audioControls}
        >
          {children}
        </BaseAction>
      )}
    </AnimatePresence>
  );
}
