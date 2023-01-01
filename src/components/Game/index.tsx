import { Background } from '../Action/Background';
import { Character, ClearCharacter } from '../Action/Character';
import { ComponentType } from 'react';
import { GameBase } from './GameBase';
import { GameProvider } from './GameContext';
import { Scene } from '../Scene';
import { Text } from '../Action/Text';
import { ClearTextBox, TextBox } from '../Action/TextBox';

import BACKGROUND_1 from '/public/bg-1.jpg';
import BACKGROUND_2 from '/public/bg-2.jpg';
import CHARACTER_1 from '/public/char-1.png';
import CHARACTER_2 from '/public/char-2.png';

function SceneTest1() {
    return (
        <Scene>
            <Background src={BACKGROUND_1.src} />

            <Character
                srcs={[
                    { uri: CHARACTER_1.src, side: 'left' },
                    { uri: CHARACTER_2.src, side: 'right' },
                ]}
            />

            <TextBox />

            <Text speaker="Character 1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque feugiat ullamcorper aliquam.
            </Text>

            <Text speaker="Character 1">
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
            </Text>

            <Text speaker="Character 2">
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur lobortis diam a
                pulvinar lobortis. Maecenas in risus nec velit cursus ultricies.
                Vestibulum nulla ante, euismod id lobortis ut, scelerisque id
                mi. In egestas neque eu quam fringilla tincidunt.
            </Text>

            <Text>
                Donec diam quam, fermentum sed maximus nec, ullamcorper posuere
                nisl. Cras orci velit, dictum sed luctus id, varius a lorem.
                Donec vitae nulla quis enim maximus vestibulum.
            </Text>

            <ClearTextBox />

            <ClearCharacter />

            <Character srcs={[{ uri: CHARACTER_1.src }]} />

            <TextBox />

            <Text speaker="Character 1">
                Class aptent taciti sociosqu ad litora.
            </Text>

            <Background src={BACKGROUND_2.src} />

            <Character srcs={[{ uri: CHARACTER_1.src }]} />

            <TextBox />

            <Text speaker="Character 1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque feugiat ullamcorper aliquam.
            </Text>

            <Text>
                Donec diam quam, fermentum sed maximus nec, ullamcorper posuere
                nisl. Cras orci velit, dictum sed luctus id, varius a lorem.
                Donec vitae nulla quis enim maximus vestibulum.
            </Text>
        </Scene>
    );
}

function SceneTest2() {
    return (
        <Scene>
            <Background src={BACKGROUND_2.src} />

            <Character srcs={[{ uri: CHARACTER_1.src }]} />

            <TextBox />

            <Text speaker="Character 1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque feugiat ullamcorper aliquam.
            </Text>

            <Text>
                Donec diam quam, fermentum sed maximus nec, ullamcorper posuere
                nisl. Cras orci velit, dictum sed luctus id, varius a lorem.
                Donec vitae nulla quis enim maximus vestibulum.
            </Text>
        </Scene>
    );
}

const scenes = prepareScenes({ SceneTest1, SceneTest2 });

type GameScenes = typeof scenes;

export interface Scenes extends GameScenes {}

export type SceneId = keyof Scenes;

export function Game() {
    function onGoHome() {}

    return (
        <div className="flex h-screen items-center justify-center">
            <GameProvider initialSceneId="Test1" onGoHome={onGoHome}>
                <GameBase initialSceneId="Test1" scenes={scenes}>
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
