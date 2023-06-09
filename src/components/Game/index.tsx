'use client';

import { ReactNode } from 'react';
import { Background } from '../Action/Background';
import { Decision } from '../Action/Decision';
import { GameProvider } from './GameContext';
import { Scene } from '../Scene';
import { ScreenText } from '../Action/ScreenText';
import { Sound } from '../Action/Sound';
import { Text } from '../Action/Text';
import { TitleScreen } from '../Action/TitleScreen';
import useSound from 'use-sound';

import BACKGROUND_ROOM from '/public/assets/images/room.png';
import BACKGROUND_BATHROOM_DOOR from '/public/assets/images/bathroom_door.png';
import BACKGROUND_BATHROOM from '/public/assets/images/bathroom.png';
import BACKGROUND_TOILET from '/public/assets/images/toilet.png';
import BACKGROUND_SINK from '/public/assets/images/sink.png';
import BACKGROUND_SHOWER_CURTAIN from '/public/assets/images/shower_curtain.png';
import BACKGROUND_SHADOW from '/public/assets/images/shadow.png';
import BACKGROUND_SHADOW_V2 from '/public/assets/images/shadowV2.png';
import IMAGE_SWITCH from '/public/assets/images/switch.png';

const GameScenes = {
  START: 'Scene_Start',
  GOOD_ENDING: 'Scene_Good_Ending'
};

export type SceneId = keyof typeof GameScenes;

export function Game() {
  const whispersControl = useSound('/assets/sounds/eerie_sounds.aac');
  const screamV1Control = useSound('/assets/sounds/scream.aac');
  const screamV2Control = useSound('/assets/sounds/screamV2.aac');

  const scenes = new Map<string, ReactNode>([
    [
      GameScenes.START,
      <Scene key={GameScenes.START}>
        <TitleScreen />

        <Background src={BACKGROUND_ROOM.src} />

        <Text>
          Siempre que estoy comodo para domir me dan ganas de ir a orinar...
        </Text>

        <Text>Que molestia...</Text>

        <Text>...</Text>

        <Text>*se levanta*</Text>

        <Background src={BACKGROUND_BATHROOM_DOOR.src} />

        <Text src={IMAGE_SWITCH.src}>*click*</Text>

        <Background src={BACKGROUND_BATHROOM.src} />

        <Background src={BACKGROUND_TOILET.src} />

        <Text>Ahhh...</Text>
        <Text>...</Text>
        <Text>...</Text>

        <Text>*lo guarda*</Text>

        <Decision
          options={[
            { label: 'Me lavo las manos' },
            {
              label: 'Me regreso a la cama',
              to: GameScenes.GOOD_ENDING as SceneId
            }
          ]}
        >
          ¿Y ahora?
        </Decision>

        <Background src={BACKGROUND_BATHROOM.src} />

        <Background src={BACKGROUND_SINK.src} />

        <Text>*se lava*</Text>

        <Text>*bosteza*</Text>

        <Text>Uy, que sueño...</Text>

        <Sound audioControls={whispersControl[0]} />

        <Text>...</Text>
        <Text>¿Qué fue eso?</Text>
        <Text>...</Text>

        <Background src={BACKGROUND_BATHROOM.src} />

        <Sound audioControls={whispersControl[0]} />

        <Text>...Pa... Parece que viene de...</Text>

        <Background src={BACKGROUND_SHOWER_CURTAIN.src} />

        <Text>De la ventana...</Text>

        <Sound audioControls={whispersControl[0]} />

        <Decision
          options={[
            { label: 'Investigo' },
            { label: 'Nop, nop', to: GameScenes.GOOD_ENDING as SceneId }
          ]}
        >
          ...
        </Decision>

        <Sound audioControls={screamV1Control[0]} />

        <Background src={BACKGROUND_SHADOW.src} durationMs={800} />

        <Sound audioControls={screamV2Control[0]} />
        <Background src={BACKGROUND_SHADOW_V2.src} durationMs={1000} />

        <ScreenText>
          <div className='uppercase text-center'>Fin</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ],
    [
      GameScenes.GOOD_ENDING,
      <Scene key={GameScenes.GOOD_ENDING}>
        <Background src={BACKGROUND_ROOM.src} />

        <Text>Bueno... a dormir</Text>

        <ScreenText>
          <div className='uppercase text-center'>Fin</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ]
  ]);

  return (
    <div className='relative h-screen aspect-video bg-gray-900 overflow-hidden'>
      <GameProvider
        initialSceneId={GameScenes.START as SceneId}
        scenes={scenes}
      >
        {(render) => <div>{render()}</div>}
      </GameProvider>
    </div>
  );
}
