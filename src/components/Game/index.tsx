import { ComponentType } from 'react';
import { GameBase } from './GameBase';
import { GameProvider } from './GameContext';

function SceneTest() {
    return <div>SceneTest</div>;
}

const scenes = prepareScenes({ SceneTest });

type GameScenes = typeof scenes;

export interface Scenes extends GameScenes {}

export type SceneId = keyof Scenes;

export function Game() {
    function onGoHome() {}

    return (
        <div className="flex h-screen items-center justify-center">
            <GameProvider initialSceneId="Test" onGoHome={onGoHome}>
                <GameBase initialSceneId="Test" scenes={scenes} />
            </GameProvider>
        </div>
    );
}

export function prepareScenes<T_Scenes extends Record<string, ComponentType>>(
    scenes: T_Scenes
) {
    const preparedScenes = Object.fromEntries(
        Object.entries(scenes)
            .filter(([exportName]) => exportName.startsWith('Scene'))
            .map(([exportName, exportComponent]) => [
                exportName.replace(/^Scene/, ''),
                exportComponent,
            ])
    ) as {
        [K in keyof typeof scenes as K extends `Scene${infer T_Id}`
            ? T_Id
            : never]: typeof scenes[K];
    };

    return preparedScenes;
}
