import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { SceneId } from '../Game/GameState';
import { Statement } from '../Statement/StatementContext';
import { useGame } from '../Game/GameContext';
import useEventCallback from 'use-event-callback';
import { useMeasure } from '@react-hookz/web';

interface SceneContextType {
  sceneId: SceneId;
  containerRect: { width: number; height: number };
  focusedStatementIndex: number;
  registerStatement: (statement: Statement) => void;
  getStatementByIndex: (statementIndex: number) => Statement | undefined;

  // skip an amount of statements
  goToNextStatement: (skip?: number) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

interface SceneProviderProps {
  sceneId: SceneId;
  children: ReactNode;
}

export function SceneProvider({ sceneId, children }: SceneProviderProps) {
  const { currentLocation, goToLocation } = useGame();

  const focusedStatementIndex =
    sceneId === currentLocation.sceneId ? currentLocation.statementIndex : 0;

  const [statementByIndex] = useState(() => new Map<number, Statement>());
  const [containerRect, containerRef] = useMeasure<HTMLDivElement>();

  const goToNextStatement = useEventCallback((skip: number = 0) => {
    const focusedStatement = statementByIndex.get(focusedStatementIndex);

    const optimisticNextIndex =
      focusedStatementIndex + (focusedStatement?.step ?? 1) + skip;

    const nextStatement = statementByIndex.get(
      Math.min(optimisticNextIndex, statementByIndex.size - 1)
    );

    if (nextStatement) {
      goToLocation(sceneId, nextStatement.index);
    }
  });

  const context = useMemo((): SceneContextType | null => {
    if (containerRect) {
      const registerStatement = (statement: Statement) => {
        statementByIndex.set(statement.index, statement);
      };

      const getStatementByIndex = (statementIndex: number) => {
        return statementByIndex.get(statementIndex);
      };

      return {
        sceneId,
        containerRect,
        focusedStatementIndex,
        registerStatement,
        getStatementByIndex,
        goToNextStatement
      };
    } else {
      return null;
    }
  }, [
    sceneId,
    containerRect,
    focusedStatementIndex,
    goToLocation,
    goToNextStatement,
    statementByIndex
  ]);

  return (
    <div
      ref={containerRef}
      onClick={(event) => {
        const targetContained =
          event.currentTarget === event.target ||
          event.currentTarget.contains(event.target as Element);

        if (!targetContained) {
          return;
        }

        const statement = statementByIndex.get(focusedStatementIndex);

        console.log({ targetContained, statement });

        if (statement?.type.variation.startsWith('skippable')) {
          const focusedStatement = statementByIndex.get(focusedStatementIndex);

          const entered = focusedStatement?.enter() ?? false;

          console.log({ focusedStatement, entered });

          if (!entered) {
            goToNextStatement();
          }
        }
      }}
    >
      {context && (
        <SceneContext.Provider value={context}>
          {children}
        </SceneContext.Provider>
      )}
    </div>
  );
}

export function useScene() {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error('`useScene` can only be use inside a `Game` component.');
  }

  return context;
}
