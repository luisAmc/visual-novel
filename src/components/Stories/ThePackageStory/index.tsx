import { Background } from '../../Action/Background';
import { BGM, StopBGM } from './BMG';
import { BlackScreen } from './BlackScreen';
import { BranchDecision } from './BranchDecision';
import { CHILLER_FONT, ROBOTO_MONO } from '~/app/layout';
import { CreepyText } from './CreepyText';
import { GameProvider } from '../../Game/GameContext';
import { getTextMessages } from './getTextMessages';
import { PointClick, Target } from './PointClick';
import { ReactNode } from 'react';
import { Scene } from '../../Scene';
import { ScreenConversation } from './ScreenConversation';
import { ScreenText } from '~/components/Action/ScreenText';
import { Sound } from '../../Action/Sound';
import { Text } from '../../Action/Text';
import { TitleScreen } from '../../Action/TitleScreen';
import clsx from 'clsx';
import useSound from 'use-sound';

import BG_BAG from '/public/assets/the-package/images/bag.webp';
import BG_BAG_DOLL_1 from '/public/assets/the-package/images/bag-doll-1.webp';
import BG_BAG_DOLL_2 from '/public/assets/the-package/images/bag-doll-2.webp';
import BG_BAG_DOLL_3 from '/public/assets/the-package/images/bag-doll-3.webp';
import BG_BAG_DOLL_4 from '/public/assets/the-package/images/bag-doll-4.webp';
import BG_BAG_DOLL_5 from '/public/assets/the-package/images/bag-doll-5.webp';
import BG_BAG_DOLL_5_ZOOMED from '/public/assets/the-package/images/bag-doll-5-zoomed.webp';
import BG_CELLPHONE from '/public/assets/the-package/images/cellphone.webp';
import BG_CLOSE_LIVING_ROOM from '/public/assets/the-package/images/close-living-room.webp';
import BG_CLOSE_LIVING_ROOM_DOLL_1 from '/public/assets/the-package/images/close-living-room-doll-1.webp';
import BG_CLOSE_LIVING_ROOM_DOLL_2 from '/public/assets/the-package/images/close-living-room-doll-2.webp';
import BG_CLOSE_LIVING_ROOM_STAINED from '/public/assets/the-package/images/close-living-room-stained.webp';
import BG_DOLL from '/public/assets/the-package/images/doll.webp';
import BG_DOLL_STAR_1 from '/public/assets/the-package/images/doll-star-1.webp';
import BG_DOLL_STAR_10 from '/public/assets/the-package/images/doll-star-10.webp';
import BG_DOLL_STAR_2 from '/public/assets/the-package/images/doll-star-2.webp';
import BG_DOLL_STAR_3 from '/public/assets/the-package/images/doll-star-3.webp';
import BG_DOLL_STAR_4 from '/public/assets/the-package/images/doll-star-4.webp';
import BG_DOLL_STAR_5 from '/public/assets/the-package/images/doll-star-5.webp';
import BG_DOLL_STAR_6 from '/public/assets/the-package/images/doll-star-6.webp';
import BG_DOLL_STAR_7 from '/public/assets/the-package/images/doll-star-7.webp';
import BG_DOLL_STAR_8 from '/public/assets/the-package/images/doll-star-8.webp';
import BG_DOLL_STAR_9 from '/public/assets/the-package/images/doll-star-9.webp';
import BG_DOOR_CLOSE from '/public/assets/the-package/images/door-close.webp';
import BG_DOOR_OPEN_BOX from '/public/assets/the-package/images/door-open-box.webp';
import BG_DOOR_OPEN_BOX_ZOOMED from '/public/assets/the-package/images/door-open-box-zoomed.webp';
import BG_DOOR_OPEN_DELIVERY_MAN from '/public/assets/the-package/images/door-open-delivery-man.webp';
import BG_DOOR_OPEN_NOTE from '/public/assets/the-package/images/door-open-note.webp';
import BG_HALL from '/public/assets/the-package/images/hall.webp';
import BG_HALL_DOLL from '/public/assets/the-package/images/hall-doll.webp';
import BG_HALL_DOLL_CLOSE_1 from '/public/assets/the-package/images/hall-doll-close-1.webp';
import BG_HALL_DOLL_CLOSE_2 from '/public/assets/the-package/images/hall-doll-close-2.webp';
import BG_HALL_DOLL_CLOSE_3 from '/public/assets/the-package/images/hall-doll-close-3.webp';
import BG_HALL_DOLL_CLOSE_4 from '/public/assets/the-package/images/hall-doll-close-4.webp';
import BG_HALL_DOLL_CLOSE_5 from '/public/assets/the-package/images/hall-doll-close-5.webp';
import BG_HALL_DOLL_CLOSE_5_ZOOMED from '/public/assets/the-package/images/hall-doll-close-5-zoomed.webp';
import BG_HALL_DOLL_CLOSE_6_ZOOMED from '/public/assets/the-package/images/hall-doll-close-6-zoomed.webp';
import BG_LIVING_ROOM_CLEAN from '/public/assets/the-package/images/living-room-clean.webp';
import BG_LIVING_ROOM_DOLL_1 from '/public/assets/the-package/images/living-room-doll-1.webp';
import BG_LIVING_ROOM_DOLL_2 from '/public/assets/the-package/images/living-room-doll-2.webp';
import BG_LIVING_ROOM_DOLL_3 from '/public/assets/the-package/images/living-room-doll-3.webp';
import BG_LIVING_ROOM_DOLL_4 from '/public/assets/the-package/images/living-room-doll-4.webp';
import BG_LIVING_ROOM_STAINED from '/public/assets/the-package/images/living-room-stained.webp';
import BG_OPENED_BOX from '/public/assets/the-package/images/opened-box.webp';
import BG_PARK from '/public/assets/the-package/images/park.webp';
import BG_PARK_GHOST_1 from '/public/assets/the-package/images/park-ghost-1.webp';
import BG_PARK_GHOST_2 from '/public/assets/the-package/images/park-ghost-2.webp';
import BG_PARK_GHOST_3 from '/public/assets/the-package/images/park-ghost-3.webp';
import BG_PARK_GHOST_4 from '/public/assets/the-package/images/park-ghost-4.webp';
import BG_PARK_GHOST_5 from '/public/assets/the-package/images/park-ghost-5.webp';
import BG_PARK_GHOST_6 from '/public/assets/the-package/images/park-ghost-6.webp';
import BG_PEEPHOLE from '/public/assets/the-package/images/peephole.webp';
import BG_PEEPHOLE_DELIVERY_MAN from '/public/assets/the-package/images/peephole-delivery-man.webp';
import BG_PEEPHOLE_SHADOW from '/public/assets/the-package/images/peephole-shadow.webp';
import BG_PEEPHOLE_SHADOW_BOX from '/public/assets/the-package/images/peephole-shadow-box.webp';
import BG_POINT_AND_CLICK_TUTORIAL from '/public/assets/the-package/images/point-and-click-tutorial.webp';
import BG_SNACKS from '/public/assets/the-package/images/snacks.webp';

const Scenes = {
  TUTORIAL: 'Scene_Tutorial',
  START: 'Scene_Start',
  BOX_TAKEN: 'Scene_Box_Taken',
  BOX_UNTAKEN: 'Scene_Box_Untaken',
  DOLL_INSIDE: 'Scene_Doll_Inside',
  DOLL_OUTSIDE: 'Scene_Doll_Outside',
  PARK_BAG_OPEN: 'Scene_Park_Bag_Open',
  PARK_BAG_UNOPENED: 'Scene_Park_Bag_Unopened'
};

export function ThePackageStory() {
  const BGMS = {
    HAPPY_MOMENTS: useSound('/assets/the-package/sounds/happy-moments.mp3', {
      loop: true
    }),
    JAZZ: useSound('/assets/the-package/sounds/jazz-2min.mp3', { loop: true }),
    PARK_AMBIANCE: useSound('/assets/the-package/sounds/park-ambiance.mp3', {
      loop: true
    }),
    TSUTGUNOHI_SMALL: useSound(
      '/assets/the-package/sounds/tsugunohi-theme.mp3',
      { loop: true, volume: 0.2 }
    ),
    TSUTGUNOHI: useSound('/assets/the-package/sounds/tsugunohi-theme.mp3', {
      loop: true
    })
  };

  const SOUNDS = {
    CONVERTING: useSound('/assets/the-package/sounds/converting.mp3')[0],
    DIALING: useSound('/assets/the-package/sounds/dialing.mp3')[0],
    DISLOCATION: useSound('/assets/the-package/sounds/dislocation.mp3')[0],
    KNOCK: useSound('/assets/the-package/sounds/knock.aac')[0],
    LAUGH_1: useSound('/assets/the-package/sounds/laugh-1.mp3')[0],
    LAUGH_2: useSound('/assets/the-package/sounds/laugh-2.mp3')[0],
    LAUGH_3: useSound('/assets/the-package/sounds/laugh-3.mp3')[0],
    NOTIFICATION: useSound('/assets/the-package/sounds/notification.aac')[0],
    PAPER_FLUTTER: useSound('/assets/the-package/sounds/paper-flutter.mp3')[0],
    RUNNING: useSound('/assets/the-package/sounds/running.mp3')[0],
    SCREAM_1: useSound('/assets/the-package/sounds/scream-1.mp3')[0],
    SCREAM_2: useSound('/assets/the-package/sounds/scream-2.mp3')[0],
    UNLOCKING_DOOR: useSound(
      '/assets/the-package/sounds/unlocking-door.aac'
    )[0],
    UNZIP: useSound('/assets/the-package/sounds/unzip.mp3')[0],
    WAILING: useSound('/assets/the-package/sounds/wailing.mp3')[0]
  };

  const scenes = new Map<string, ReactNode>([
    [
      Scenes.TUTORIAL,
      <Scene key={Scenes.TUTORIAL}>
        <TitleScreen>
          <h1 className='text-8xl text-gray-50 uppercase'>El paquete</h1>

          <div className='text-4xl'>
            — Esta experiencia usa sonidos, por favor suba el volumen —
          </div>

          <div className='mt-20 text-5xl'>
            Precione en cualquier lugar para continuar...
          </div>
        </TitleScreen>

        <ScreenText>
          <div className='flex flex-col items-center space-y-8 max-w-3xl'>
            <div className='mt-20 text-2xl'>Tutorial...</div>

            <h1 className='font-bold text-center'>— Point & Click —</h1>

            <p className='text-2xl text-justify'>
              Cuando el cursor se convierta en un{' '}
              <span className='font-bold'>ojo</span> (👁️) tendrás que dar click
              en algún lugar específico de la pantalla para continuar.
            </p>

            <div className='mt-20 text-2xl'>
              Prueba con la siguiente imagen...
            </div>

            <div className='mt-20 text-2xl'>
              Presiona click para avanzar a la prueba...
            </div>
          </div>
        </ScreenText>

        <PointClick src={BG_POINT_AND_CLICK_TUTORIAL.src}>
          <Target left={77.5} top={72.2} />
        </PointClick>

        <BlackScreen />

        <BranchDecision
          options={[{ label: 'Si, comencemos...', to: Scenes.START }]}
        >
          <span className='text-white'>¿Entendido?</span>
        </BranchDecision>
      </Scene>
    ],
    [
      Scenes.START,
      <Scene key={Scenes.START}>
        <BGM player={BGMS.JAZZ} />

        <Background src={BG_LIVING_ROOM_CLEAN.src} />

        <ScreenText>— En la tarde-noche de un día normal —</ScreenText>

        <Text>¿Será que voy al parque mas tarde?</Text>
        <Text>Desde que lo aperturarón solo he ido una vez.</Text>
        <Text>A saber como se mirará de noche...</Text>
        <Text>Con todas las luces y la laguna, ufff... fijo bonito.</Text>
        <Text>...</Text>
        <Text>(Tal vez hoy sea el día que encuentre...)</Text>
        <Text>(Al amor de mi vida *w*)</Text>

        <Sound audioControls={SOUNDS.NOTIFICATION} />

        <Text>¿Mmm?</Text>
        <Background src={BG_CELLPHONE.src} />
        <Text>Ahh es este man</Text>

        <ScreenConversation {...getTextMessages(0)} />

        <Background src={BG_LIVING_ROOM_CLEAN.src} />

        <Text>Tanta bulla que ha hecho este man con esa caja que me mando</Text>
        <Text>Y todavía no me dice que es lo que viene en ella jajaja...</Text>
        <Text>Toca esperar, a ver que sorpresa me llevo.</Text>
        <Text>(A ver con que cosa loca de Japón sale :D)</Text>

        <Background src={BG_LIVING_ROOM_CLEAN.src} durationMs={1500} />

        <ScreenText>— Minutos después —</ScreenText>

        <Sound audioControls={SOUNDS.KNOCK} />
        <Background src={BG_DOOR_CLOSE.src} />

        <Text>Voooy...</Text>
        <Text>(A ver quién es...)</Text>

        <Background src={BG_PEEPHOLE_SHADOW_BOX.src} />

        <Text>¡Oh! El paquete.</Text>
        <Text>(¿Por qué se mira tan borroso?)</Text>
        <Text>
          (De seguro esta llena de polvo la mirilla, no recuerdo la última vez
          que la limpie.)
        </Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Background src={BG_DOOR_OPEN_BOX.src} />

        <Text>...</Text>
        <Text>Como que voló el repartido.</Text>
        <Text>Ni la sombra le ví.</Text>
        <Text>No se esperó ni a que le diera las gracias...</Text>
        <Text>Ni se aseguró que fuera el lugar correcto de entrega...</Text>
        <Text>Que bárbaro.</Text>

        <Background src={BG_DOOR_OPEN_BOX_ZOOMED.src} />

        <Text>...</Text>
        <Text>¿Qué ondas con esta caja?</Text>
        <Text>Toda fea, maltratada.</Text>
        <Text>Como que la toco el loco del barrio, y con bastante amor.</Text>
        <Text>Se desquitarón todo el estrés con ella.</Text>

        <Text>¿Será esta la caja que me mando aquel?</Text>

        <StopBGM />

        <BranchDecision
          options={[
            { label: 'La agarro', to: Scenes.BOX_TAKEN },
            { label: 'La dejo afuera', to: Scenes.BOX_UNTAKEN }
          ]}
        >
          ¿Qué hago?
        </BranchDecision>
      </Scene>
    ],
    [
      Scenes.BOX_UNTAKEN,
      <Scene key={Scenes.BOX_UNTAKEN}>
        <BGM player={BGMS.JAZZ} />
        <Background src={BG_DOOR_OPEN_BOX.src} />
        <Text>Nah, de seguro no es para mí.</Text>
        <Text>
          No creo que aquel mandara lo que mandara en una caja tan fea.
        </Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Background src={BG_DOOR_CLOSE.src} />

        <Sound audioControls={SOUNDS.WAILING} />
        <Text>!!!</Text>
        <Text>Uy... ¿qué es eso?</Text>

        <Background src={BG_PEEPHOLE_SHADOW.src} />
        <Text>¿El repartidor otra vez?</Text>
        <Text>Fijo se dio cuenta que este no era el lugar correcto.</Text>
        <Sound audioControls={SOUNDS.WAILING} />
        <Text>(Y con esos sonidos parece que anda bolo mas bien)</Text>

        <Background src={BG_DOOR_CLOSE.src} />
        <Text>Bueno...</Text>

        <Background src={BG_LIVING_ROOM_CLEAN.src} />

        <Background src={BG_CLOSE_LIVING_ROOM.src} durationMs={1500} />

        <ScreenText>— Minutos después —</ScreenText>

        <Sound audioControls={SOUNDS.KNOCK} />

        <Text>???</Text>
        <Text>Voooy...</Text>

        <Background src={BG_DOOR_CLOSE.src} />
        <Text>(A ver...)</Text>

        <Background src={BG_PEEPHOLE_DELIVERY_MAN.src} />
        <Text>¿Mmm? ¿Otro repartidor?</Text>
        <Text>(Que clarito se mira ahora...)</Text>

        <Text speaker='Repartidor'>Buenaaas, entregaaa...</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />

        <Background src={BG_DOOR_OPEN_DELIVERY_MAN.src} />
        <Text speaker='Repartidor'>
          Buenas noches, entrega de parte de... ¿Carlos?
        </Text>

        <Text>Si, es correcto. Gracias.</Text>

        <Text speaker='Repartidor'>Listo, buenas noches...</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />

        <Background src={BG_DOOR_CLOSE.src} />

        <Background src={BG_LIVING_ROOM_CLEAN.src} />
        <Background src={BG_CLOSE_LIVING_ROOM.src} />

        <Text>A ver que es al final...</Text>
        <Text>...</Text>

        <StopBGM />

        <Text>?!?!?</Text>
        <Text>...</Text>
        <Text>Eh... ehh...</Text>
        <Text>Esto es... esto... es...</Text>

        <BGM player={BGMS.HAPPY_MOMENTS} />
        <Background src={BG_SNACKS.src} />

        <Text>¡Son un montón de golosinas!</Text>
        <Text>Churritos, galletas, sodas... ¡Viene de todo!</Text>
        <Text>Hasta gomitas en forma de insectos ¡Ahh!</Text>
        <Text>¡Que otro rollo!</Text>

        <ScreenText>
          <div className='text-center mb-4'>Comí hasta reventar...</div>
          <div className='text-center'>
            (Y todavía me sobran para mañana :D)
          </div>
        </ScreenText>
        <ScreenText>
          <div className='uppercase text-center mb-8'>Final ①</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ],
    [
      Scenes.BOX_TAKEN,
      <Scene key={Scenes.BOX_TAKEN}>
        <BGM player={BGMS.JAZZ} />

        <Background src={BG_DOOR_OPEN_BOX.src} />
        <Text>Que codo este man.</Text>
        <Text>Pidió el envío en la caja mas chasta jaja</Text>
        <Text>Aunque fijo fue en él envió que se estropeó.</Text>
        <Text>Que se le va a hacer...</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />

        <Background src={BG_DOOR_CLOSE.src} />
        <Background src={BG_LIVING_ROOM_CLEAN.src} />
        <Background src={BG_CLOSE_LIVING_ROOM.src} />

        <Text>Bueno... a ver que es...</Text>
        <StopBGM />

        <Background src={BG_OPENED_BOX.src} />

        <Text>!!!</Text>
        <Text>¿Qué rayos...?</Text>
        <Text>¿Qué ondas con este man?</Text>
        <Text>¿Por qué me habrá mandado esto?</Text>
        <Text>Después de decir que era algo que me iba a gustar...</Text>
        <Text>Nah, quiero explicaciones...</Text>
        <Text>Ahorita lo llamo...</Text>

        <Sound audioControls={SOUNDS.DIALING} />

        <Background src={BG_OPENED_BOX.src} durationMs={3000} />

        <Text speaker='Carlos'>¡Hey! ¿Qué tal?</Text>

        <Text>Ehh... tranquilo... bueno hasta hace unos momentos...</Text>

        <Text speaker='Carlos'>¿Por qué? ¿Qué paso?</Text>

        <Text>Pues me entregarón el paquete, pe—</Text>

        <Text speaker='Carlos'>
          ¿Ah, ya te llegó? ¿Y qué ondas? ¿Qué pensas?
        </Text>

        <Text speaker='Carlos'>¿Otro rollo, no?</Text>

        <Text>No... no diria que es otro rollo man.</Text>

        <Text>Ósea, te agradezco que me hayas mandado algo, pero...</Text>

        <Text>¿Por qué me mandaste esto?</Text>

        <Text speaker='Carlos'>Ah... p- pensé que te iba a gustar</Text>

        <Text speaker='Carlos'>No creí que esta seria tu reacción...</Text>

        <Text>Bueno, no sé qué reacción esperabas que tuviera.</Text>

        <Text>¿Cómo pensabas que esto me iba a gustar?</Text>

        <Text speaker='Carlos'>
          Pero si solo son unos churros y galletas man.
        </Text>

        <Text speaker='Carlos'>
          ¿Será que paso mucho tiempo en el envío y por eso se miran mal?
        </Text>

        <Text>¿Ah?</Text>
        <Text>Espérame... ¿qué?</Text>
        <Text>¿Churros y galletas?</Text>
        <Text>¿Eso fue lo que enviaste?</Text>

        <Text speaker='Carlos'>Pues si, probalas aunque sea...</Text>

        <Text speaker='Carlos'>
          Tal vez solo es que se miran raras, pero puede que sepan bien todavía.
        </Text>

        <Text>No... es que...</Text>
        <Text>No fue eso lo que estaba en la caja...</Text>

        <Text speaker='Carlos'>¿Mmm? ¿Y qué es lo que había entonces?</Text>

        <Text>Es...</Text>

        <BGM player={BGMS.TSUTGUNOHI} />
        <Background src={BG_DOLL.src} />

        <Text>Una muñeca.</Text>

        <Text speaker='Carlos'>¿Una muñeca?</Text>

        <Text>Si, una de esas muñecas japonesas.</Text>

        <Text speaker='Carlos'>Ah pues, eso no fue lo que envié.</Text>

        <Text speaker='Carlos'>
          ¿No será que la pediste vos y no te acordas?
        </Text>

        <Text>Nambe, que voy a andar pidiendo esta cosa.</Text>

        <Text speaker='Carlos'>
          Ahh, entonces te la entregarón por error poe.
        </Text>

        <Text speaker='Carlos'>
          De seguro es de alguien mas de los apartamentos y por error te lo
          entregarón a tí.
        </Text>

        <StopBGM />

        <Text>...</Text>
        <Text>Tiene sentido fijate.</Text>
        <Text>Fijo viene alguien después a preguntar por el paquete.</Text>

        <Text speaker='Carlos'>Mhmm</Text>

        <BGM player={BGMS.JAZZ} />

        <Text speaker='Carlos'>
          Pucha, la fregada es que te dije que era lo que te mandé de verdad
          jajaja.
        </Text>

        <Text>Pucha, si hombe.</Text>
        <Text>
          Pero ahora, cuando hagán la entrega, estaré seguro de que si es el tuyo
          jaja.
        </Text>

        <Text speaker='Carlos'>Eso sí jaja.</Text>
        <Text speaker='Carlos'>Dale pues, ahí hablamos después.</Text>

        <Text>Dale, nos vemos.</Text>

        <Text speaker='Carlos'>Adios.</Text>

        <Background src={BG_CLOSE_LIVING_ROOM.src} />

        <Text>Bueno... por mientras te podre aquí...</Text>

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_1.src} />

        <Text>...</Text>
        <Text>...</Text>
        <Text>Ya viéndola bien, entiendo porque alguien quisiera una...</Text>
        <Text>Pero ese alguien no soy yo.</Text>
        <Text>A ver cuánto se tardan por venir por ella...</Text>

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_1.src} durationMs={1500} />

        <ScreenText>— Tiempo después —</ScreenText>

        <Sound audioControls={SOUNDS.NOTIFICATION} />

        <Text>¿Mmm?</Text>
        <Background src={BG_CELLPHONE.src} />

        <ScreenConversation {...getTextMessages(1)} />

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_1.src} />

        <Text>...</Text>
        <Text>...</Text>
        <Text>¿No estás embrujada, no?</Text>
        <Text>...</Text>
        <Text>... ¿que estoy haciendo hablándole a una muñeca?...</Text>
        <Text>Je...</Text>
        <Text>...</Text>
        <Text>...</Text>

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_1.src} durationMs={1500} />

        <ScreenText>— Tiempo después —</ScreenText>

        <Sound audioControls={SOUNDS.KNOCK} />
        <Background src={BG_DOOR_CLOSE.src} />

        <Text>Voooy...</Text>
        <Text>(Talvez vienen por la muñeca...)</Text>
        <Text>(A ver...)</Text>

        <Sound audioControls={SOUNDS.WAILING} />
        <Background src={BG_PEEPHOLE_SHADOW.src} />
        <Text>¡Ah! El repartidor.</Text>
        <Text>
          (Suena bolo este man... fijo por eso dejo la caja donde no era...)
        </Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />

        <StopBGM />

        <Background src={BG_DOOR_OPEN_NOTE.src} />

        <Text>¿Qué rayos?</Text>
        <Text>¿Qué se hizo?</Text>
        <Text>...</Text>
        <Text>¿Una nota?</Text>

        <Sound audioControls={SOUNDS.PAPER_FLUTTER} />
        <ScreenText>
          <div
            className={clsx(
              CHILLER_FONT.className,
              'text-red-700 tracking-widest text-7xl p-8 rounded-md bg-slate-50'
            )}
          >
            No la hagas enojar...
          </div>
        </ScreenText>

        <Text>???</Text>
        <Text>¿&quot;No la hagas enojar&quot;?</Text>
        <Text>Si que anda bolo este man...</Text>

        <BGM player={BGMS.JAZZ} />
        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Background src={BG_DOOR_CLOSE.src} />

        <Text>...</Text>
        <Text>...¿&quot;no la hagas enojar&quot;?...</Text>
        <Text>...</Text>

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_2.src} />

        <Text>Mmm</Text>
        <Text>...¿que pensará aquel?...</Text>

        <ScreenConversation {...getTextMessages(2)} />

        <Text>...</Text>
        <Text>Mmm...</Text>

        <StopBGM />

        <BranchDecision
          options={[
            { label: 'La saco al pasillo', to: Scenes.DOLL_OUTSIDE },
            { label: 'La dejo adentro', to: Scenes.DOLL_INSIDE }
          ]}
        >
          ¿Qué hago?
        </BranchDecision>
      </Scene>
    ],
    [
      Scenes.DOLL_OUTSIDE,
      <Scene key={Scenes.DOLL_OUTSIDE}>
        <BGM player={BGMS.JAZZ} />

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_2.src} />

        <Text>La verdad es que si...</Text>

        <Text>No quiero ser responsable de esta cosa.</Text>
        <Text>Que el dueño se la vea con el repartidor.</Text>
        <Text>No es asunto mío.</Text>

        <Background src={BG_DOOR_CLOSE.src} />

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />

        <Background src={BG_HALL.src} />
        <Background src={BG_HALL_DOLL.src} />

        <Text>...Ok... ¡Listo!</Text>
        <Text>
          Aquí si vuelve el repartidor o si pasa tu dueño te puede llevar.
        </Text>
        <Text>La verdad es que no te quiero en mi casa jaja.</Text>
        <Text>Adiós, papada vieja.</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Background src={BG_DOOR_CLOSE.src} />

        <StopBGM />
        <CreepyText speaker='???'>¿Por qué?</CreepyText>

        <Text>?!?!?</Text>
        <Text>¿Qué fue eso?</Text>

        <Background src={BG_PEEPHOLE.src} />
        <Text>¿Quién dijo eso?</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Background src={BG_HALL_DOLL.src} />

        <Text>...</Text>

        <CreepyText speaker='???'>¿Por qué?</CreepyText>

        <Text>?!?!?</Text>

        <Background src={BG_HALL_DOLL_CLOSE_1.src} />

        <CreepyText speaker='???'>
          ¿Por qué no queres que este con vos?
        </CreepyText>

        <Text>¿Es- esta hablando? ¿La mu- muñeca esta hablado?</Text>

        <BGM player={BGMS.TSUTGUNOHI_SMALL} />

        <Background src={BG_HALL_DOLL_CLOSE_1.src} />

        <CreepyText speaker='Muñeca'>
          ¿¡QUE POR QUÉ NO QUERES QUE ESTE CON VOS!?
        </CreepyText>
        <CreepyText speaker='Muñeca'>¿¡POR QUÉ!?</CreepyText>
        <CreepyText speaker='Muñeca'>¡AHHHHH!</CreepyText>

        <Sound audioControls={SOUNDS.CONVERTING} />

        <Background src={BG_HALL_DOLL_CLOSE_1.src} instant durationMs={100} />
        <Background src={BG_HALL_DOLL_CLOSE_2.src} instant durationMs={100} />
        <Background src={BG_HALL_DOLL_CLOSE_3.src} instant durationMs={100} />
        <Background src={BG_HALL_DOLL_CLOSE_4.src} instant durationMs={1000} />

        <CreepyText speaker='Muñeca'>¡PERO NO TE PREOCUPES!</CreepyText>
        <CreepyText speaker='Muñeca'>¡AHORA SOLO SERÁS UNO MÁS!</CreepyText>

        <Sound audioControls={SOUNDS.SCREAM_1} />

        <Background src={BG_HALL_DOLL_CLOSE_5.src} instant />
        <Background src={BG_HALL_DOLL_CLOSE_5_ZOOMED.src} instant />
        <Background
          src={BG_HALL_DOLL_CLOSE_6_ZOOMED.src}
          instant
          durationMs={1000}
        />

        <BlackScreen />

        <Background src={BG_DOLL_STAR_1.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_2.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_3.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_4.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_5.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_6.src} instant durationMs={100} />

        <Background src={BG_DOLL_STAR_7.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_8.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_9.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_10.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_7.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_8.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_9.src} instant durationMs={100} />
        <Background src={BG_DOLL_STAR_10.src} instant durationMs={100} />

        <ScreenText>
          <div
            className={clsx(
              CHILLER_FONT.className,
              'flex flex-col items-center space-y-8 text-red-500'
            )}
          >
            <div className='text-center text-5xl'>... Ahora...</div>
            <div className='text-center text-7xl'>
              ...siempre estarás conmigo...
            </div>
          </div>
        </ScreenText>

        <ScreenText>
          <div className='uppercase text-center mb-8'>Final ②</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ],
    [
      Scenes.DOLL_INSIDE,

      <Scene key={Scenes.DOLL_INSIDE}>
        <BGM player={BGMS.JAZZ} />

        <Background src={BG_CLOSE_LIVING_ROOM_DOLL_2.src} />
        <Text>A saber cuánto costará una de estas cosas.</Text>
        <Text>Mejor espero que alguien venga por ella.</Text>

        <Sound audioControls={SOUNDS.KNOCK} />
        <Text>Ve, justo cuando lo pensé...</Text>

        <Background src={BG_DOOR_CLOSE.src} />
        <Text>(A ver...)</Text>

        <Sound audioControls={SOUNDS.WAILING} />
        <Background src={BG_PEEPHOLE_SHADOW.src} />
        <Text>Ash... otra vez este tipo...</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <StopBGM />
        <Background src={BG_DOOR_OPEN_NOTE.src} />

        <Text>...</Text>
        <Text>Ya se está pasando este man...</Text>
        <Text>(...¿otra nota?...)</Text>

        <Sound audioControls={SOUNDS.PAPER_FLUTTER} />
        <ScreenText>
          <div
            className={clsx(
              CHILLER_FONT.className,
              'text-red-700 tracking-widest text-7xl p-8 rounded-md bg-slate-50 flex flex-col items-center space-y-4'
            )}
          >
            <div>Cuídala... si no lo haces...</div>
            <div className='text-8xl'>...no verás la luz...</div>
          </div>
        </ScreenText>

        <Text>H- Hey... ¿esto es una amenaza, no?</Text>
        <Text>¡Hey! ¡Se que estas ahí!</Text>
        <Text>
          ¡Si te vuelves a aparecer por mi puerta llamaré a la policia!
        </Text>
        <Text>¡Oíste!</Text>
        <Text>...</Text>
        <Text>...</Text>

        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Background src={BG_DOOR_CLOSE.src} />

        <Text>Pucha... ¿qué ondas con la gente?</Text>

        <Background src={BG_LIVING_ROOM_STAINED.src} />
        <Background src={BG_CLOSE_LIVING_ROOM_STAINED.src} />

        <Text>!!!</Text>
        <Text>¿Q- qué?</Text>
        <Text>¿Qué se hizo?</Text>
        <Text>La muñeca... ¿dónde está?</Text>

        <Sound audioControls={SOUNDS.LAUGH_2} />
        <BlackScreen />

        <CreepyText speaker='???'>
          ... encuéntrame, encuéntrame...
        </CreepyText>

        <Background src={BG_LIVING_ROOM_DOLL_1.src} />

        <Text>¿A- adonde está?</Text>

        <BGM player={BGMS.TSUTGUNOHI} />

        <PointClick src={BG_LIVING_ROOM_DOLL_1.src}>
          <Target left={22.7} top={59} />
        </PointClick>

        <Sound audioControls={SOUNDS.LAUGH_2} />
        <BlackScreen />
        <Text>!!!</Text>

        <PointClick src={BG_LIVING_ROOM_DOLL_2.src}>
          <Target left={12} top={48.4} />
        </PointClick>

        <Sound audioControls={SOUNDS.LAUGH_2} />
        <BlackScreen />

        <Text>P- pero...</Text>

        <PointClick src={BG_LIVING_ROOM_DOLL_3.src}>
          <Target left={37.5} top={94} />
        </PointClick>

        <Sound audioControls={SOUNDS.LAUGH_2} />
        <BlackScreen durationMs={1500} />

        <Text>!!!</Text>

        <PointClick src={BG_LIVING_ROOM_DOLL_4.src}>
          <Target left={47.3} top={53} />
        </PointClick>

        <Sound audioControls={SOUNDS.LAUGH_3} />

        <BlackScreen durationMs={1500} />

        <Background src={BG_LIVING_ROOM_STAINED.src} />

        <Text>?!?!?</Text>
        <Text>¡Ay, diosito!</Text>
        <Text>¡Tengo que salir de aquí!</Text>
        <Text>Esta cosa tiene el diablo adentro</Text>

        <StopBGM />

        <Background src={BG_DOOR_CLOSE.src} />
        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <BlackScreen />
        <Sound audioControls={SOUNDS.UNLOCKING_DOOR} />
        <Sound audioControls={SOUNDS.RUNNING} />
        <BlackScreen durationMs={8000} />

        <BGM player={BGMS.PARK_AMBIANCE} />

        <Background src={BG_PARK.src} />

        <Text>Hm... hm... hm...</Text>
        <Text>Me quedaré en un hotel hoy...</Text>
        <Text>Vale mas que agarre la maleta que llevo al gimnasio...</Text>
        <Text>Como no fui hoy por esperar el paquete de aquel...</Text>
        <Text>No use la mudada de ropa que normalmente llevo...</Text>
        <Text>
          Voy a ver quién me acompaña mañana para sacar y quemar esa cosa...
        </Text>
        <Text>Hm... hm... hm...</Text>

        <Sound audioControls={SOUNDS.LAUGH_2} />
        <StopBGM />
        <Text>?!?!?!?</Text>

        <Text>¿A...?</Text>
        <Text>¿A... a dónde está?</Text>

        <Sound audioControls={SOUNDS.LAUGH_2} />
        <Background src={BG_BAG.src} />

        <Text>Viene... de adentro de mi maleta...</Text>

        <StopBGM />

        <BranchDecision
          options={[
            { label: 'La abro', to: Scenes.PARK_BAG_OPEN },
            { label: 'Me largo de aquí', to: Scenes.PARK_BAG_UNOPENED }
          ]}
        >
          ¿Que hago?
        </BranchDecision>
      </Scene>
    ],
    [
      Scenes.PARK_BAG_OPEN,
      <Scene key={Scenes.PARK_BAG_OPEN}>
        <Background src={BG_BAG.src} />
        <Sound audioControls={SOUNDS.LAUGH_2} />
        <Text>Si, es de adentro</Text>

        <BlackScreen />

        <Sound audioControls={SOUNDS.UNZIP} />
        <Background src={BG_BAG_DOLL_1.src} />
        <BGM player={BGMS.TSUTGUNOHI_SMALL} />

        <Text>¿Có- cómo llego aquí?</Text>
        <CreepyText speaker='???'>¿Por qué te fuiste?</CreepyText>

        <Text>¿Q- Qué?...</Text>
        <Text>¿Es- esta... hablando?</Text>

        <CreepyText speaker='Muñeca'>
          Estabamos comenzando a divertirnos ¿no es así?
        </CreepyText>

        <CreepyText speaker='Muñeca'>¿¡AHH!?</CreepyText>
        <CreepyText speaker='Muñeca'>¿¡NO ES ASÍ!?</CreepyText>

        <Sound audioControls={SOUNDS.LAUGH_2} />

        <Background src={BG_BAG_DOLL_1.src} />

        <Sound audioControls={SOUNDS.WAILING} />
        <Background src={BG_PARK_GHOST_1.src} />

        <Text>???</Text>
        <Text>¿El repartidor...?</Text>

        <CreepyText speaker='El Repartidor'>...</CreepyText>

        <Background src={BG_BAG_DOLL_1.src} />

        <CreepyText speaker='Muñeca'>¿¡AHH!?</CreepyText>
        <CreepyText speaker='Muñeca'>
          ¿¡POR QUÉ ME QUERIAS DEJAR!? ¿¡AHH!?
        </CreepyText>
        <CreepyText speaker='Muñeca'>¡AHHHHH!</CreepyText>

        <Sound audioControls={SOUNDS.CONVERTING} />

        <Background src={BG_BAG_DOLL_1.src} instant durationMs={100} />
        <Background src={BG_BAG_DOLL_2.src} instant durationMs={100} />
        <Background src={BG_BAG_DOLL_3.src} instant durationMs={100} />
        <Background src={BG_BAG_DOLL_4.src} instant durationMs={1000} />

        <Sound audioControls={SOUNDS.SCREAM_1} />

        <Background src={BG_BAG_DOLL_5.src} instant />
        <Background src={BG_BAG_DOLL_5_ZOOMED.src} durationMs={1500} />

        <Background src={BG_PARK_GHOST_1.src} />

        <CreepyText speaker='El Repartidor'>...</CreepyText>
        <CreepyText speaker='El Repartidor'>
          ...¿acaso no te pedí que la cuidaras?...
        </CreepyText>
        <CreepyText speaker='El Repartidor'>
          ...si no quieres estar con ella...
        </CreepyText>
        <CreepyText speaker='El Repartidor'>
          ...no deberías de estar entonces...
        </CreepyText>

        <Sound audioControls={SOUNDS.DISLOCATION} />
        <Background src={BG_PARK_GHOST_1.src} instant durationMs={100} />
        <Background src={BG_PARK_GHOST_2.src} instant durationMs={100} />
        <Background src={BG_PARK_GHOST_3.src} instant durationMs={100} />
        <Background src={BG_PARK_GHOST_4.src} instant />

        <Sound audioControls={SOUNDS.SCREAM_2} />
        <Background src={BG_PARK_GHOST_5.src} instant durationMs={100} />
        <Background src={BG_PARK_GHOST_6.src} instant durationMs={1500} />

        <BlackScreen />

        <ScreenText>
          <div className='flex flex-col items-center space-y-8'>
            <div className='text-center text-3xl'>Desde ese momento...</div>
            <div className='text-center text-3xl'>
              No importa cuantas veces vuelva a abrir los ojos...
            </div>
            <div className='text-center'>...solo veo oscuridad...</div>
          </div>
        </ScreenText>

        <ScreenText>
          <div className='uppercase text-center mb-8'>Final ④</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ],
    [
      Scenes.PARK_BAG_UNOPENED,
      <Scene key={Scenes.PARK_BAG_UNOPENED}>
        <Background src={BG_BAG.src} />

        <Text>Ni en broma abro esta cosa...</Text>
        <Text>Al diablo con esto...</Text>

        <BlackScreen />
        <Sound audioControls={SOUNDS.RUNNING} />
        <BlackScreen durationMs={1000} />

        <ScreenText>
          <div className='flex flex-col items-center space-y-8'>
            <div className='text-center text-3xl'>
              Deje mi maleta ahí, pero no importa...
            </div>
            <div className='text-center text-3xl'>
              Unas semanas después pude mudarme de departamento.
            </div>
            <div className='text-center'>...Odio a las muñecas ahora...</div>
          </div>
        </ScreenText>

        <ScreenText>
          <div className='uppercase text-center mb-8'>Final ③</div>
          <div className='text-center text-4xl'>Gracias por jugar</div>
        </ScreenText>
      </Scene>
    ]
  ]);


  return (
    <div
      className={clsx(
        ROBOTO_MONO.className,
        'relative h-screen aspect-video bg-gray-900 overflow-hidden'
      )}
    >
      <GameProvider initialSceneId={Scenes.TUTORIAL} scenes={scenes}>
        {(render) => <div>{render()}</div>}
      </GameProvider>
    </div>
  );
}
