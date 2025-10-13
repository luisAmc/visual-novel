import { createContext, useContext, useState, type ReactNode } from "react";
import { createHistory, GameLocation } from ".";
import { BranchProvider } from "../Branch/useBranch";

interface GameContextType {
  currentLocation: GameLocation;
  goToBranch: (branchId: string) => void;
  goToLocation: (location: GameLocation) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type BranchMap = Map<string, ReactNode>;

interface GameProviderProps {
  initialBranchId: string;
  branches: BranchMap;
  children: (render: () => ReactNode) => ReactNode;
}

export function GameProvider({
  initialBranchId,
  branches,
  children,
}: GameProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>({
    branchId: initialBranchId,
    statementIndex: 0,
  });

  const [history] = useState(() =>
    createHistory({
      initialLocations: [currentLocation],
      onLocationsChange: (latestLocation) => {
        setCurrentLocation(latestLocation);
      },
    })
  );

  function goToBranch(branchId: string) {
    const isDifferentBranch = branchId !== currentLocation.branchId;

    if (isDifferentBranch) {
      history.push({ branchId, statementIndex: 0 });
    }
  }

  function goToLocation(location: GameLocation) {
    const isDifferentBranch = location.branchId !== currentLocation.branchId;

    const isDifferenteStatement =
      location.statementIndex !== currentLocation.statementIndex;

    const isDifferentLocation = isDifferentBranch || isDifferenteStatement;

    if (isDifferentLocation) {
      history.push(location);
    }
  }

  return (
    <GameContext.Provider value={{ currentLocation, goToBranch, goToLocation }}>
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

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("`useGame` can only be use inside a `Game` component.");
  }

  return context;
}
