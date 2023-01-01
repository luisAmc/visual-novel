import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { SceneId } from '.';
import { GameLocation, makeGameHistory } from './GameHistory';

interface GameContextType {
    // Last showned game statement
    currentLocation: GameLocation;

    // Move to the start of a specific scene
    goToScene: (sceneId: SceneId) => void;

    // Move to a specific statement in a scene
    goToLocation: (sceneId: SceneId, statementIndex: number) => void;

    // Go to the last location in history
    goBack: () => boolean;

    canGoBack: () => boolean;

    goHome?: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
    initialSceneId: SceneId;
    onGoHome?: () => void;
    children: ReactNode;
}

export function GameProvider({
    initialSceneId,
    onGoHome,
    children,
}: GameProviderProps) {
    const initialLocation: GameLocation = {
        sceneId: initialSceneId,
        statementIndex: 0,
    };

    const [currentLocation, setCurrentLocation] = useState(initialLocation);

    const [history] = useState(() =>
        makeGameHistory({
            locations: [currentLocation],
            onChange(newLocations) {
                console.log('history locations', { newLocations });

                setCurrentLocation(newLocations[newLocations.length - 1]);
            },
        })
    );

    const context = useMemo((): GameContextType => {
        const goToScene = (sceneId: SceneId) => {
            if (sceneId !== currentLocation.sceneId) {
                history.push({ sceneId, statementIndex: 0 });
            }
        };

        const goToLocation = (sceneId: SceneId, statementIndex: number) => {
            if (
                sceneId !== currentLocation.sceneId ||
                statementIndex !== currentLocation.statementIndex
            ) {
                history.push({ sceneId, statementIndex });
            }
        };

        const goBack = () => {
            return history.goBack();
        };

        return {
            currentLocation,
            goToScene,
            goToLocation,
            goBack,
            canGoBack: history.canGoBack,
            goHome: onGoHome,
        };
    }, [currentLocation]);

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
}

export function useGameContext() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error(
            '`useGameContext` can only be used inside a Game component.'
        );
    }

    return context;
}
