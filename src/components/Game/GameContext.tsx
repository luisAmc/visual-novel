"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { GameLocation, BranchId, createGameHistory } from './GameState';
import { BranchProvider } from '../Scene/SceneContext';

interface GameContextType {
  currentLocation: GameLocation;
  goToScene: (sceneId: BranchId) => void;
  goToLocation: (sceneId: BranchId, statementIndex: number) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export type SceneMap = Map<string, ReactNode>;

interface GameProviderProps {
  scenes: SceneMap;
  initialSceneId: BranchId;
  children: (render: () => ReactNode) => ReactNode;
}

export function GameProvider({
  scenes,
  initialSceneId,
  children
}: GameProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>({
    branchId: initialSceneId,
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
    const goToScene = (sceneId: BranchId) => {
      const isDifferentScene = sceneId !== currentLocation.branchId;

      if (isDifferentScene) {
        history.push({ branchId: sceneId, statementIdx: 0 });
      }
    };

    const goToLocation = (sceneId: BranchId, statementIndex: number) => {
      const isDifferentScene = sceneId !== currentLocation.branchId;
      const isDifferentStatement =
        statementIndex !== currentLocation.statementIdx;

      if (isDifferentScene || isDifferentStatement) {
        history.push({ branchId: sceneId, statementIdx: statementIndex });
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
              sceneId === currentLocation.branchId && (
                <BranchProvider key={sceneId} branchId={sceneId}>
                  {SceneComp}
                </BranchProvider>
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
