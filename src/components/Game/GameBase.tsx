import { ReactNode } from 'react';
import { SceneId, Scenes } from '.';
import { SceneProvider } from '../Scene/SceneContext';
import { useGameContext } from './GameContext';

export interface GameBaseProps {
    scenes: Scenes;
    initialSceneId: SceneId;
    children?: (render: () => ReactNode) => ReactNode;
}

export function GameBase({
    scenes,
    initialSceneId,
    children = (render) => render(),
}: GameBaseProps) {
    const { currentLocation } = useGameContext();

    console.log({ initialSceneId, currentLocation, scenes });

    return (
        <>
            {children(() => (
                <div className="flex h-full w-full overflow-hidden">
                    {Object.entries<any>(scenes).map(
                        ([sceneId, SceneComponent]) =>
                            sceneId === currentLocation.sceneId && (
                                <SceneProvider key={sceneId} sceneId={sceneId}>
                                    <SceneComponent />
                                </SceneProvider>
                            )
                    )}
                </div>
            ))}
        </>
    );
}
