import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { SceneId, createGameHistory, GameLocation } from "./GameState";
import { SceneProvider } from "../Scene/SceneContext";

interface GameContextType {
  currentLocation: GameLocation;

  goToScene(sceneId: SceneId): void;
  goToLocation(sceneId: SceneId, statementIdx: number): void;
}

const GameContext = createContext<GameContextType | null>(null);

type SceneMap = Map<string, ReactNode>;

interface GameProviderProps {
  scenes: SceneMap;
  initialSceneId: SceneId;
  children: (render: () => ReactNode) => ReactNode;
}

export function GameProvider({
  scenes,
  initialSceneId,
  children,
}: GameProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>({
    sceneId: initialSceneId,
    statementIdx: 0,
  });

  const [history] = useState(() =>
    createGameHistory({
      initialLocations: [currentLocation],
      onLocationsChange: (latestLocation) => {
        setCurrentLocation(latestLocation);
      },
    })
  );

  const context: GameContextType = useMemo(() => {
    const goToScene = (sceneId: SceneId) => {
      const isDifferentScene = sceneId !== currentLocation.sceneId;

      if (isDifferentScene) {
        history.push({ sceneId: sceneId, statementIdx: 0 });
      }
    };

    const goToLocation = (sceneId: SceneId, statementIdx: number) => {
      const isDifferentScene = sceneId !== currentLocation.sceneId;

      const isDifferenteStatement =
        statementIdx !== currentLocation.statementIdx;

      const isDifferentLocation = isDifferentScene || isDifferenteStatement;

      if (isDifferentLocation) {
        history.push({ sceneId: sceneId, statementIdx });
      }
    };

    return { currentLocation, goToScene, goToLocation };
  }, [currentLocation]);

  return (
    <GameContext.Provider value={context}>
      {children(() =>
        Array.from(scenes.entries()).map(
          ([sceneId, SceneComponent]) =>
            sceneId === currentLocation.sceneId && (
              <SceneProvider key={sceneId} sceneId={sceneId}>
                {SceneComponent}
              </SceneProvider>
            )
        )
      )}
    </GameContext.Provider>
  );
}

export function useOverseer() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "`useOverseer` can only be use inside a OverseerComponent."
    );
  }

  return context;
}
