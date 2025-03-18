import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { BranchId, createGameHistory, GameLocation } from "./GameState";
import { BranchProvider } from "../Scene/SceneContext";

interface GameContextType {
  currentLocation: GameLocation;

  goToBranch(branchId: BranchId): void;
  goToLocation(branchId: BranchId, statementIdx: number): void;
}

const GameContext = createContext<GameContextType | null>(null);

type BranchMap = Map<string, ReactNode>;

interface GameProviderProps {
  branches: BranchMap;
  initialBranchId: BranchId;
  children: (render: () => ReactNode) => ReactNode;
}

export function GameProvider({
  branches,
  initialBranchId,
  children,
}: GameProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>({
    branchId: initialBranchId,
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
    const goToBranch = (branchId: BranchId) => {
      const isDifferentBranch = branchId !== currentLocation.branchId;

      if (isDifferentBranch) {
        history.push({ branchId, statementIdx: 0 });
      }
    };

    const goToLocation = (branchId: BranchId, statementIdx: number) => {
      const isDifferentBranch = branchId !== currentLocation.branchId;

      const isDifferenteStatement =
        statementIdx !== currentLocation.statementIdx;

      const isDifferentLocation = isDifferentBranch || isDifferenteStatement;

      if (isDifferentLocation) {
        history.push({ branchId, statementIdx });
      }
    };

    return { currentLocation, goToBranch, goToLocation };
  }, [currentLocation]);

  return (
    <GameContext.Provider value={context}>
      {children(() =>
        Array.from(branches.entries()).map(
          ([branchId, BranchComponent]) =>
            branchId === currentLocation.branchId && (
              <BranchProvider key={branchId} branchId={branchId}>
                {BranchComponent}
              </BranchProvider>
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
