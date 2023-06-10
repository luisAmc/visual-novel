'use client';

import { ReactNode } from 'react';
import { Scene } from '@/components/Scene';
import { TitleScreen } from '@/components/Action/TitleScreen';
import { Background } from '@/components/Action/Background';
import { Text } from '@/components/Action/Text';
import { Decision } from '@/components/Action/Decision';
import { Sound } from '@/components/Action/Sound';
import { ScreenText } from '@/components/Action/ScreenText';
import { GameProvider } from '@/components/Game/GameContext';
import useSound from 'use-sound';

import BACKGROUND_LIVING_ROOM from '/public/assets/knock-on-the-door/images/living-room.webp';
import BACKGROUND_CELLPHONE from '/public/assets/knock-on-the-door/images/cellphone.webp';
import BACKGROUND_DOOR_LIVING_ROOM from '/public/assets/knock-on-the-door/images/door-living-room.webp';
import BACKGROUND_DOOR_VIEW from '/public/assets/knock-on-the-door/images/door-view.webp';
import BACKGROUND_DOOR_KNOCK from '/public/assets/knock-on-the-door/images/door-knock.webp';
import BACKGROUND_PEEPHOLE from '/public/assets/knock-on-the-door/images/peephole.webp';
import BACKGROUND_PERSON from '/public/assets/knock-on-the-door/images/person.webp';
import BACKGROUND_SNACKS from '/public/assets/knock-on-the-door/images/snacks.webp';

const Scenes = {
  START: 'Scene_Start',
  GOOD_CALL: 'Scene_Good_Call',
  BAD_CALL: 'Scene_Bad_Call',
  REALY_BAD_CALL: 'Scene_Realy_Bad_Call',
  GOOD_ENDING: 'Scene_Good_Ending',
  NORMAL_ENDING: 'Scene_Normal_Ending'
};

export function KnockOnTheDoorStory() {
  const knockFiveControls = useSound(
    '/assets/knock-on-the-door/sounds/knock-a.aac'
  );

  const knockTwoControls = useSound(
    '/assets/knock-on-the-door/sounds/knock-b.aac'
  );

  const vibrationControls = useSound(
    '/assets/knock-on-the-door/sounds/vibration.aac'
  );

  const screamControl = useSound('/assets/knock-on-the-door/sounds/scream.aac');

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

        <Background src={BACKGROUND_LIVING_ROOM.src} />
        <Text>...</Text>
        <Text>Pucha, si que no hay nada que hacer...</Text>
        <Text>Ningún juego bueno que jugar...</Text>
        <Text>Nada en la televisión para ver...</Text>
        <Text>...</Text>

        <Sound audioControls={vibrationControls[0]} />
        <Text>¿Mmm?</Text>

        <Background src={BACKGROUND_CELLPHONE.src} />
        <Text>¿Alguien me llama?</Text>

        <Decision
          options={[
            { label: 'Contesto', to: Scenes.GOOD_CALL },
            { label: 'Dejo que suene', to: Scenes.BAD_CALL }
          ]}
        >
          En un número que no conozco...
        </Decision>
      </Scene>
    ],
    [
      Scenes.GOOD_CALL,
      <Scene key={Scenes.GOOD_CALL}>
        <Background src={BACKGROUND_CELLPHONE.src} />
        <Text>¿Aló?</Text>

        <Text speaker='Orlando'>Hey, ¿que tal?</Text>
        <Text speaker='Orlando'>Este es mi nuevo número.</Text>
        <Text speaker='Orlando'>
          Por fin encontre las Boquitas LOL, ¿puedo ir a tu casa para que las
          probemos?
        </Text>

        <Decision
          options={[
            { label: 'Dale, vení', to: Scenes.GOOD_ENDING },
            {
              label: 'Fijate que no estoy ahorita...',
              to: Scenes.NORMAL_ENDING
            }
          ]}
        >
          ...
        </Decision>
      </Scene>
    ],
    [
      Scenes.BAD_CALL,
      <Scene key={Scenes.BAD_CALL}>
        <Background src={BACKGROUND_LIVING_ROOM.src} />
        <Text>A saber quien era.</Text>
        <Text>¿Sera que pido comida?</Text>
        <Text>Pucha que ganas tengo de probar las Boquitas LOL.</Text>
        <Text>
          Dicen que están buenas pero no las encuentro en ninguna tienda.
        </Text>

        <Text>...</Text>
        <Sound audioControls={vibrationControls[0]} />
        <Text>¿Mmm?</Text>

        <Background src={BACKGROUND_CELLPHONE.src} />
        <Text>¿Otra vez?</Text>
        <Text>¿Quien será el que molesta...?</Text>

        <Decision
          options={[
            { label: 'Contesto', to: Scenes.GOOD_CALL },
            { label: 'Dejo que suene', to: Scenes.REALY_BAD_CALL }
          ]}
        >
          ...
        </Decision>
      </Scene>
    ],
    [
      Scenes.REALY_BAD_CALL,
      <Scene key={Scenes.REALY_BAD_CALL}>
        <Background src={BACKGROUND_CELLPHONE.src} />

        <Sound audioControls={knockFiveControls[0]} />
        <Background src={BACKGROUND_DOOR_LIVING_ROOM.src} />
        <Text>Voooy...</Text>

        <Background src={BACKGROUND_PEEPHOLE.src} />
        <Text>¿Mmm?</Text>
        <Text>No hay nadie...</Text>
        <Text>Que raro...</Text>

        <Background src={BACKGROUND_LIVING_ROOM.src} />

        <Sound audioControls={vibrationControls[0]} />
        <Background src={BACKGROUND_CELLPHONE.src} />
        <Text>¿Otra vez? Que pesado...</Text>

        <Decision options={[{ label: 'Contesto' }]}>...</Decision>

        <Text>¿Aló? ¿Quien habla?</Text>
        <Text>...</Text>
        <Text>*silencio*</Text>

        <Sound audioControls={knockFiveControls[0]} />
        <Background src={BACKGROUND_DOOR_LIVING_ROOM.src} />
        <Text>Dios mío...</Text>

        <Background src={BACKGROUND_PEEPHOLE.src} />
        <Text>¿Que rayos esta pasando?</Text>

        <Background src={BACKGROUND_DOOR_VIEW.src} />

        <Sound audioControls={knockFiveControls[0]} />
        <Background src={BACKGROUND_DOOR_KNOCK.src} />
        <Text>¡Hey!</Text>

        <Background src={BACKGROUND_PEEPHOLE.src} />
        <Text>...</Text>

        <Background src={BACKGROUND_DOOR_VIEW.src} />

        <Background src={BACKGROUND_LIVING_ROOM.src} />

        <Sound audioControls={vibrationControls[0]} />
        <Background src={BACKGROUND_CELLPHONE.src} />

        <Sound audioControls={knockFiveControls[0]} />
        <Background src={BACKGROUND_DOOR_LIVING_ROOM.src} />

        <Sound audioControls={knockTwoControls[0]} />
        <Background src={BACKGROUND_DOOR_KNOCK.src} />
        <Text>¡HEY!</Text>

        <Background src={BACKGROUND_PEEPHOLE.src} />
        <Text>¡Dejen de molestar!</Text>
        <Text>¡Es que si los agarro volviendo a tocar la puerta...!</Text>

        <Background src={BACKGROUND_DOOR_VIEW.src} />
        <Text>...</Text>
        <Text>...</Text>
        <Text>Creo que ya se fuerón...</Text>

        <Text>...</Text>
        <Text>¿Será que están esperando que me mueva? Tengo que revisar.</Text>

        <Sound audioControls={screamControl[0]} />
        <Background instant src={BACKGROUND_PERSON.src} durationMs={800} />
        <Background instant src={BACKGROUND_PERSON.src} durationMs={800} />

        <ScreenText>
          <div className='uppercase text-center'>Final Malo</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ],
    [
      Scenes.GOOD_ENDING,
      <Scene key={Scenes.GOOD_ENDING}>
        <Background src={BACKGROUND_CELLPHONE.src} />
        <Text speaker='Orlando'>En unos 20 minutos llegaré.</Text>
        <Text>Esta bien, aquí estaré. Nos vemos.</Text>

        <Background src={BACKGROUND_LIVING_ROOM.src} />
        <Text>Toca esperar...</Text>

        <Sound audioControls={knockFiveControls[0]} />
        <Background src={BACKGROUND_DOOR_LIVING_ROOM.src} />
        <Text>¡Voooy!</Text>
        <Text>Pasa, pasa...</Text>

        <Background src={BACKGROUND_SNACKS.src} />
        <Text>Mmm... si que estan buenas</Text>

        <ScreenText>
          <div className='text-center'>Por fin probe las Boquitas LOL.</div>
        </ScreenText>

        <ScreenText>
          <div className='uppercase text-center'>Final bueno</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ],
    [
      Scenes.NORMAL_ENDING,
      <Scene key={Scenes.NORMAL_ENDING}>
        <Background src={BACKGROUND_CELLPHONE.src} />
        <Text speaker='Orlando'>A dale, dale, ahí otro día.</Text>

        <Text>Mañana ire a tu casa para las probemos juntos.</Text>

        <Text speaker='Orlando'>Okay, nos vemos mañana entonces. Adios.</Text>

        <Text>Adios.</Text>

        <ScreenText>
          <div className='text-center'>
            Sin poder hacer algo me fui a dormir.
          </div>
          <div className='text-center'>Por fin probare las Boquitas LOL.</div>
        </ScreenText>

        <ScreenText>
          <div className='uppercase text-center'>Final normal</div>
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
