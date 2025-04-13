"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { GameLocation, SceneId, createGameHistory } from './GameState';
import { SceneProvider } from '../Scene/SceneContext';

interface GameContextType {
  currentLocation: GameLocation;
  goToScene: (sceneId: SceneId) => void;
  goToLocation: (sceneId: SceneId, statementIndex: number) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export type SceneMap = Map<string, ReactNode>;

interface GameProviderProps {
  scenes: SceneMap;
  initialSceneId: SceneId;
  children: (render: () => ReactNode) => ReactNode;
}

export function GameProvider({
  scenes,
  initialSceneId,
  children
}: GameProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>({
    sceneId: initialSceneId,
    statementIdx: 0
  });

  const [history] = useState(() =>
    createGameHistory({
      initialLocations: [currentLocation],
      onLocationsChange: (latestLocation) => {
        setCurrentLocation(latestLocation);
      }
    })
  );

  const context = useMemo((): GameContextType => {
    const goToScene = (sceneId: SceneId) => {
      const isDifferentScene = sceneId !== currentLocation.sceneId;

      if (isDifferentScene) {
        history.push({ sceneId: sceneId, statementIdx: 0 });
      }
    };

    const goToLocation = (sceneId: SceneId, statementIndex: number) => {
      const isDifferentScene = sceneId !== currentLocation.sceneId;
      const isDifferentStatement =
        statementIndex !== currentLocation.statementIdx;

      if (isDifferentScene || isDifferentStatement) {
        history.push({ sceneId: sceneId, statementIdx: statementIndex });
      }
    };

    return {
      currentLocation,
      goToScene,
      goToLocation
    };
  }, [currentLocation]);

  return (
    <GameContext.Provider value={context}>
      {children(() => (
        <>
          {Array.from(scenes.entries()).map(
            ([sceneId, SceneComp]) =>
              sceneId === currentLocation.sceneId && (
                <SceneProvider key={sceneId} sceneId={sceneId}>
                  {SceneComp}
                </SceneProvider>
              )
          )}
        </>
      ))}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('`useGame` can only be use inside a GameComponent.');
  }

  return context;
}
