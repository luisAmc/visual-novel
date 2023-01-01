import { SceneId } from '.';

export interface GameLocation {
    sceneId: SceneId;
    statementIndex: number;
}

interface GameHistory {
    // Look the most recently pushed location
    peek: () => GameLocation;

    // Push a location to the history
    push: (location: GameLocation) => void;

    // Reset the history to a new stack starting with the given location
    reset: (location: GameLocation) => void;

    // Removes most recent location
    goBack: () => boolean;

    canGoBack: () => boolean;
}

interface makeGameHistoryArgs {
    locations: GameLocation[];
    onChange?: (newLocations: GameLocation[]) => void;
}

export function makeGameHistory({
    locations,
    onChange,
}: makeGameHistoryArgs): GameHistory {
    console.log('makeGameHistory locations', { locations });

    let items = locations;

    const peek = () => items[items.length - 1]!;

    const push = (location: GameLocation) => {
        items = [...items, location];
        onChange?.(items);
    };

    const reset = (location: GameLocation) => {
        items = [location];
        onChange?.(items);
    };

    const goBack = () => {
        if (items.length > 1) {
            items = items.slice(0, -1);
            onChange?.(items);
            return true;
        }

        return false;
    };

    return {
        peek,
        push,
        reset,
        goBack,
        canGoBack: () => items.length > 1,
    };
}
