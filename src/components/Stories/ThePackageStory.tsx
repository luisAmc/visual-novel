import { ReactNode } from 'react';
import { GameProvider } from '../Game/GameContext';
import { Scene } from '../Scene';
import { TitleScreen } from '../Action/TitleScreen';

const Scenes = {
  START: 'Scene_Start'
};

export function ThePackageStory() {
  const scenes = new Map<string, ReactNode>([
    [
      Scenes.START,
      <Scene key={Scenes.START}>
        <TitleScreen>
          <h1 className='text-8xl text-gray-50 uppercase'>
            Alguien toca la puerta...
          </h1>

          <div className='text-4xl'>
            — Esta experiencia usa sonidos, por favor suba el volumen —
          </div>

          <div className='mt-20 text-5xl'>
            Precione en cualquier lugar para continuar...
          </div>
        </TitleScreen>
      </Scene>
    ]
  ]);

  return (
    <div className='relative h-screen aspect-video bg-gray-900 overflow-hidden'>
      <GameProvider initialSceneId={Scenes.START} scenes={scenes}>
        {(render) => <div>{render()}</div>}
      </GameProvider>
    </div>
  );
}
