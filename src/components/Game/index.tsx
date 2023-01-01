import { Background } from '../Action/Background';
import { ComponentType } from 'react';
import { GameBase } from './GameBase';
import { GameProvider } from './GameContext';
import { Scene } from '../Scene';

import BACKGROUND_1 from '/public/bg-1.jpg';
import BACKGROUND_2 from '/public/bg-2.jpg';

function SceneTest() {
    return (
        <Scene>
            <Background src={BACKGROUND_1.src} />
            
            <Background src={BACKGROUND_2.src} />
        </Scene>
    );
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
                <GameBase initialSceneId="Test" scenes={scenes}>
                    {(render) => (
                        <div className="flex h-[720px] w-[1280px] flex-col bg-red-50">
                            {render()}
                        </div>
                    )}
                </GameBase>
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
