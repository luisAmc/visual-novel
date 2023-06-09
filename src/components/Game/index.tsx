'use client';

import { ReactNode } from 'react';
import { GameProvider } from './GameContext';
import { Scene } from '../Scene';
import { Text } from '../Action/Text';
import { ChangeScene } from '../Action/ChangeScene';
import { Background } from '../Action/Background';

import BACKGROUND_ROOM from '/public/assets/images/room.png';
import BACKGROUND_BATHROOM_DOOR from '/public/assets/images/bathroom_door.png';
import BACKGROUND_BATHROOM from '/public/assets/images/bathroom.png';

export function Game() {
  const scenes = new Map<string, ReactNode>([
    [
      'Scene1',
      <Scene>
        <Background src={BACKGROUND_ROOM.src} />
        <Text>Scene 1: Text 1</Text>
        <Text>Scene 1: Text 2</Text>
        <Text>Scene 1: Text 3</Text>
        <Background src={BACKGROUND_BATHROOM_DOOR.src} />
        <ChangeScene to='Scene2' />
      </Scene>
    ],
    [
      'Scene2',
      <Scene>
        <Text>Scene 2: Text 1</Text>
        <Text>Scene 2: Text 2</Text>
        <ChangeScene to='Scene1' />
      </Scene>
    ]
  ]);

  return (
    <div className='relative w-full aspect-video bg-red-50'>
      <GameProvider initialSceneId='Scene1' scenes={scenes}>
        {(render) => <div>{render()}</div>}
      </GameProvider>
    </div>
  );
}
