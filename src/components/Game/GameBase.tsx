import { ReactNode } from 'react';
import { SceneId, Scenes } from '.';
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
    console.log({ initialSceneId, scenes });

    const { currentLocation } = useGameContext();

    return (
        <>
            {children(() => (
                <div className="flex h-full w-full overflow-hidden">
                    {Object.entries<any>(scenes).map(
                        ([sceneId, SceneComponent]) =>
                            sceneId === currentLocation.sceneId && (
                                <SceneComponent key={sceneId} />
                            )
                    )}
                </div>
            ))}
        </>
    );
}
