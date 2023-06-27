'use client';

import { ReactNode } from 'react';
import { Scene } from '~/components/Scene';
import { TitleScreen } from '~/components/Action/TitleScreen';
import { Background } from '~/components/Action/Background';
import { Text } from '~/components/Action/Text';
import { Decision } from '~/components/Action/Decision';
import { Sound } from '~/components/Action/Sound';
import { ScreenText } from '~/components/Action/ScreenText';
import { GameProvider } from '~/components/Game/GameContext';
import useSound from 'use-sound';

import BACKGROUND_ROOM from '/public/assets/bathroom-visit/images/room.webp';
import BACKGROUND_BATHROOM_DOOR from '/public/assets/bathroom-visit/images/bathroom_door.webp';
import BACKGROUND_BATHROOM from '/public/assets/bathroom-visit/images/bathroom.webp';
import BACKGROUND_TOILET from '/public/assets/bathroom-visit/images/toilet.webp';
import BACKGROUND_SINK from '/public/assets/bathroom-visit/images/sink.webp';
import BACKGROUND_SHOWER_CURTAIN from '/public/assets/bathroom-visit/images/shower_curtain.webp';
import BACKGROUND_SHADOW from '/public/assets/bathroom-visit/images/shadow.webp';
import BACKGROUND_SHADOW_V2 from '/public/assets/bathroom-visit/images/shadowV2.webp';
import IMAGE_SWITCH from '/public/assets/bathroom-visit/images/switch.webp';

const Scenes = {
  START: 'Scene_Start',
  GOOD_ENDING: 'Scene_Good_Ending'
};

export function BathroomVisitStory() {
  const whispersControl = useSound(
    '/assets/bathroom-visit/sounds/eerie_sounds.aac'
  );
  const screamV1Control = useSound('/assets/bathroom-visit/sounds/scream.aac');
  const screamV2Control = useSound(
    '/assets/bathroom-visit/sounds/screamV2.aac'
  );

  const scenes = new Map<string, ReactNode>([
    [
      Scenes.START,
      <Scene key={Scenes.START}>
        <TitleScreen>
          <h1 className='text-8xl text-gray-50 uppercase'>
            Visita en el baño...
          </h1>

          <div className='text-4xl'>
            — Esta experiencia usa sonidos, por favor suba el volumen —
          </div>

          <div className='mt-20 text-5xl'>
            Precione en cualquier lugar para continuar...
          </div>
        </TitleScreen>

        <Background src={BACKGROUND_ROOM.src} />

        <Text>
          Siempre que estoy comodo para domir me dan ganas de ir a orinar...
        </Text>

        <Text>Que molestia...</Text>

        <Text>...</Text>

        <Text>*se levanta*</Text>

        <Background src={BACKGROUND_BATHROOM_DOOR.src} />

        <Text>*enciende la luz del baño*</Text>

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
              to: Scenes.GOOD_ENDING
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
            { label: 'Nop, nop', to: Scenes.GOOD_ENDING }
          ]}
        >
          ¿Muevo la cortina para investigar?
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
      Scenes.GOOD_ENDING,
      <Scene key={Scenes.GOOD_ENDING}>
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
      <GameProvider initialSceneId={Scenes.START} scenes={scenes}>
        {(render) => <div>{render()}</div>}
      </GameProvider>
    </div>
  );
}
