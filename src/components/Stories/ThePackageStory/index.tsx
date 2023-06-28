import { Background } from '../../Action/Background';
import { BGM } from './BMG';
import { GameProvider } from '../../Game/GameContext';
import { ReactNode } from 'react';
import { Scene } from '../../Scene';
import { ScreenConversation } from './ScreenConversation';
import { Sound } from '../../Action/Sound';
import { Text } from '../../Action/Text';
import { TitleScreen } from '../../Action/TitleScreen';
import useSound from 'use-sound';

import BG_LIVING_ROOM_CLEAN from '/public/assets/the-package/images/living-room-clean.webp';
import BG_CELLPHONE from '/public/assets/the-package/images/cellphone.webp';
import BG_DOOR_CLOSE from '/public/assets/the-package/images/door-close.webp';
import BG_DOOR_OPEN from '/public/assets/the-package/images/door-open.webp';
import BG_PEEPHOLE from '/public/assets/the-package/images/peephole.webp';
import { Decision } from '~/components/Action/Decision';

const Scenes = {
  START: 'Scene_Start'
};

export function ThePackageStory() {
  const S_JAZZ = useSound('/assets/the-package/sounds/jazz.m4a', {
    loop: true
  });

  const SOUND_NOTIFICATION = useSound(
    '/assets/the-package/sounds/notification.aac'
  )[0];

  const SOUND_KNOCK = useSound('/assets/the-package/sounds/knock.aac')[0];
  const SOUND_UNLOCKING_DOOR = useSound(
    '/assets/the-package/sounds/unlocking-door.aac'
  )[0];

  const scenes = new Map<string, ReactNode>([
    [
      Scenes.START,
      <Scene key={Scenes.START}>
        <TitleScreen>
          <h1 className='text-8xl text-gray-50 uppercase'>El paquete...</h1>

          <div className='text-4xl'>
            — Esta experiencia usa sonidos, por favor suba el volumen —
          </div>

          <div className='mt-20 text-5xl'>
            Precione en cualquier lugar para continuar...
          </div>
        </TitleScreen>

        <BGM player={S_JAZZ} />
        <Background src={BG_LIVING_ROOM_CLEAN.src} />

        <Text>
          Queria ir al parque, pero con esta lluvia tendra que ser otro día...
        </Text>
        <Text>Que fregada, pero bueno...</Text>

        <Sound audioControls={SOUND_NOTIFICATION} />

        <Text>¿Mmm?</Text>
        <Background src={BG_CELLPHONE.src} />
        <Text>Ahh es este man</Text>

        <ScreenConversation
          messages={[
            {
              speaker: 'a',
              text: 'Hoy andube en Kabukichō, cada dos pasos hay alguien tratando de venderte cerveza xD'
            },
            { speaker: 'b', text: 'A saber cuanto tomaste hoy entonces haha' },
            {
              speaker: 'a',
              text: 'Hay que hacele fuerzas para seguir viendo las tiendas haha'
            },
            {
              speaker: 'a',
              text: 'Vieras la comida tambien, hay un carrito que te venden los cangrejos fritos... con todo y caparazón'
            },
            {
              speaker: 'a',
              text: '(ㆆ_ㆆ)'
            },
            { speaker: 'a', text: 'Y sin mentirte, son bien ricos xD' },
            {
              speaker: 'b',
              text: 'Nambe suena a que es quiebra dientes eso xD'
            },
            {
              speaker: 'a',
              text: 'Vieras que buenos'
            },
            {
              speaker: 'a',
              text: '( ͡° ͜ʖ ͡° )'
            },
            {
              speaker: 'a',
              text: 'Por cierto, ya te llegará el paquete, ¿no?'
            },
            {
              speaker: 'a',
              text: 'Me escribis tu reacción cuando ya lo tengas... c:'
            },
            {
              speaker: 'b',
              text: '¿Crees que hagán hoy la entrega? Queria ir al parque hoy en la noche...'
            },
            {
              speaker: 'a',
              text: 'Si no llega hoy llegará hasta el lunes, me dijerón que no hacen entregas en los fines de semana.'
            }
          ]}
        />

        <Background src={BG_LIVING_ROOM_CLEAN.src} />

        <Text>Tanta bulla que ha hecho este man con esa caja que me mando</Text>
        <Text>Y todavía no me dice que es lo que viene en ella jajaja...</Text>
        <Text>Toca esperar, a ver que sorpresa me llevo.</Text>
        <Text>( A ver con que cosa loca de Japón sale :D )</Text>

        <Background src={BG_LIVING_ROOM_CLEAN.src} durationMs={1500} />

        <Text>** Minutos después **</Text>

        <Sound audioControls={SOUND_KNOCK} />
        <Background src={BG_DOOR_CLOSE.src} />

        <Text>Vooy...</Text>
        <Text>( A ver quién es... )</Text>

        <Background src={BG_PEEPHOLE.src} />

        <Text>¡Oh! El paquete.</Text>
        <Text>( ¿Por qué se mira tan borroso? )</Text>
        <Text>
          ( Fijo esta llena de polvo la mirilla, no recuerdo la última vez que
          la limpie. )
        </Text>

        <Sound audioControls={SOUND_UNLOCKING_DOOR} />
        <Background src={BG_DOOR_OPEN.src} />

        <Text>...</Text>
        <Text>Como que voló el repartido.</Text>
        <Text>Ni la sombra le ví.</Text>
        <Text>( No se espero ni a que le diera las gracias... )</Text>

        <Text>...</Text>
        <Text>¿Pero que ondas con esta caja?</Text>
        <Text>Como que la toco el loco del barrio, y con bastante amor.</Text>
        <Text>Se desquitarón todo el estrés con ella.</Text>

        <Text>¿En serio será la caja que me mando aquel?</Text>

        <Decision
          options={[{ label: 'Tomar la caja' }, { label: 'Dejarla afuera' }]}
        >
          ¿En serio será la caja que me mando aquel?
        </Decision>
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
