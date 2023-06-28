'use client';

import { AnimatePresence, AnimationControls } from 'framer-motion';
import {
  Statement,
  StatementType,
  useStatement
} from '../Statement/StatementContext';
import { ReactNode, useEffect, useRef } from 'react';
import { BaseAction, BaseActionInstance, BaseActionProps } from './BaseAction';

export interface ActionProps
  extends Partial<Pick<Statement, 'step' | 'until'>>,
    Pick<BaseActionProps, 'audioControls' | 'soundPlayer'> {
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
  soundPlayer,
  children
}: ActionProps) {
  const { register, visible } = useStatement();

  const viewRef = useRef<BaseActionInstance>(null);

  useEffect(() => {
    register({
      actionName,
      type: statementType,
      until,
      step,
      enter: () => viewRef.current?.enter() ?? false
    });
  }, [actionName, until, step, register]);

  return (
    <AnimatePresence>
      {visible && (
        <BaseAction
          ref={viewRef}
          zIndex={zIndex}
          statementType={statementType}
          audioControls={audioControls}
          soundPlayer={soundPlayer}
        >
          {children}
        </BaseAction>
      )}
    </AnimatePresence>
  );
}
