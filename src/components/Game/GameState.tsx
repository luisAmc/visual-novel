export type BranchId = string;

export interface GameLocation {
  branchId: BranchId;
  statementIdx: number;
}

interface GameHistory {
  push: (location: GameLocation) => void;
}

interface CreateGameHistoryArgs {
  initialLocations: GameLocation[];
  onLocationsChange: (lastestLocation: GameLocation) => void;
}

export function createGameHistory({
  initialLocations,
  onLocationsChange,
}: CreateGameHistoryArgs): GameHistory {
  let locations = initialLocations;

  return {
    push: (newLocation) => {
      locations = [...locations, newLocation];
      onLocationsChange(newLocation);
    },
  };
}
