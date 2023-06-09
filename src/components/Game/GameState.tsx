export type SceneId = string;

export interface GameLocation {
  sceneId: SceneId;
  statementIndex: number;
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
  onLocationsChange
}: CreateGameHistoryArgs): GameHistory {
  let locations = initialLocations;

  return {
    push: (newLocation) => {
console.log({newLocation})

      locations = [...locations, newLocation];
      onLocationsChange(locations[locations.length - 1]);
    }
  };
}
