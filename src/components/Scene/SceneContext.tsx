import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { SceneId } from '../Game';
import { Statement } from './StatementContext';
import { useGameContext } from '../Game/GameContext';
import { useMeasure } from '@react-hookz/web';
import useEventCallback from 'use-event-callback';

interface SceneContextType {
    sceneId: SceneId;
    containerRect: { width: number; height: number };
    registerStatement: (statement: Statement) => void;
    getStatement: (statementIndex: number) => Statement | undefined;
    getStatementCount: () => number;
    focusedStatementIndex: number;
    goToStatement: (statementLabel: string) => void;
    goToNextStatement: (plusIndex?: number) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

interface SceneProviderProps {
    sceneId: SceneId;
    children: ReactNode;
}

export function SceneProvider({ sceneId, children }: SceneProviderProps) {
    const { currentLocation, goToLocation } = useGameContext();

    const focusedStatementIndex =
        currentLocation.sceneId === sceneId
            ? currentLocation.statementIndex
            : 0;

    const [statementByIndex] = useState(() => new Map<number, Statement>());
    const [statementByLabel] = useState(() => new Map<string, Statement>());
    const [containerRect, containerRef] = useMeasure<HTMLDivElement>();

    const goToNextStatement = useEventCallback((plusIndex: number = 0) => {
        const focusedStatement = statementByIndex.get(focusedStatementIndex);

        const nextStatement =
            typeof focusedStatement?.next === 'string'
                ? statementByLabel.get(focusedStatement.next)
                : statementByIndex.get(
                      Math.min(
                          statementByIndex.size - 1,
                          focusedStatementIndex +
                              (focusedStatement?.next ?? 1) +
                              plusIndex
                      )
                  );

        if (nextStatement) {
            goToLocation(sceneId, nextStatement.index);
        }
    });

    const context = useMemo(
        (): SceneContextType | null =>
            containerRect
                ? {
                      sceneId,
                      containerRect,
                      focusedStatementIndex,
                      registerStatement: (statement) => {
                          console.log('registerStatement', { statement });

                          statementByIndex.set(statement.index, statement);

                          if (statement.label) {
                              if (statementByLabel.has(statement.label)) {
                                  throw new Error(
                                      `Duplicated statement label: ${statement.label}`
                                  );
                              }

                              statementByLabel.set(statement.label, statement);
                          }
                      },
                      getStatement: (statementIndex) => {
                          return statementByIndex.get(statementIndex);
                      },
                      getStatementCount: () => {
                          return statementByIndex.size;
                      },
                      goToStatement: (statementLabel) => {
                          const statement =
                              statementByLabel.get(statementLabel);
                          if (!statement) {
                              throw new Error(
                                  `Unkown statement label: ${statementLabel}`
                              );
                          }

                          goToLocation(sceneId, statement?.index);
                      },
                      goToNextStatement,
                  }
                : null,
        [
            sceneId,
            containerRect,
            focusedStatementIndex,
            goToLocation,
            goToNextStatement,
            statementByIndex,
            statementByLabel,
        ]
    );

    return (
        <div
            ref={containerRef}
            onClick={(event) => {
                const targetContained =
                    event.currentTarget === event.target ||
                    (event.currentTarget as Element).contains(
                        event.target as Element
                    );

                if (!targetContained) {
                    return;
                }

                const action = statementByIndex.get(focusedStatementIndex);
                if (action?.behavior[0].startsWith('skippable')) {
                    const focusedStatement = statementByIndex.get(
                        focusedStatementIndex
                    );

                    const entered = focusedStatement?.enter() ?? false;

                    if (!entered) {
                        goToNextStatement();
                    }
                }
            }}
            className="relative flex-1 select-none"
        >
            {context && (
                <SceneContext.Provider value={context}>
                    {children}
                </SceneContext.Provider>
            )}
        </div>
    );
}

export function useSceneContext() {
    const context = useContext(SceneContext);

    if (!context) {
        throw new Error(
            '`useSceneContext` can only be used inside a Game component'
        );
    }

    return context;
}
