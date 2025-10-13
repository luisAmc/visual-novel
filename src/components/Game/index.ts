export interface GameLocation {
  branchId: string;
  statementIndex: number;
}

interface CreateHistoryArgs {
  initialLocations: Array<GameLocation>;
  onLocationsChange: (newLocation: GameLocation) => void;
}

export function createHistory({
  initialLocations,
  onLocationsChange,
}: CreateHistoryArgs) {
  let locations = initialLocations;

  return {
    push: (newLocation: GameLocation) => {
      locations = [...locations, newLocation];

      console.table(locations);

      onLocationsChange(newLocation);
    },
  };
}
