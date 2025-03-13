"use client";

import { ActionButton } from "./ActionButton";
import { BGM, StopBGM } from "../ThePackageStory/BMG";
import { BlackScreen } from "../ThePackageStory/BlackScreen";
import { CHILLER_FONT, OPEN_SANS } from "~/app/fonts";
import { cn } from "~/utils/cn";
import { GameProvider } from "~/components/Game/GameContext";
import { MobileBounds } from "./useMobileBounds";
import { MobileDecision } from "./MobileDecision";
import { MobileScreenText } from "./MobileScreenText";
import { MobileText } from "./MobileText";
import { Photo, Target } from "./Photo";
import { PortraitBackground } from "./PortraitBackground";
import { Scene } from "~/components/Scene";
import { TitleScreen } from "~/components/Action/TitleScreen";
import { type ReactNode } from "react";
import { useImagesPreload } from "./useImagesPreload";
import * as images from "./images";
import useSound from "use-sound";

const {
  BG_APP_FILTER,
  BG_APP_FRIEND,
  BG_APP_GHOUL_CLOSE,
  BG_APP_GHOUL_FAR,
  BG_APP_GHOUL_NOT_THAT_FAR,
  BG_APP_LOADING,
  BG_APP_START,
  BG_FRIEND,
  BG_GHOUL_JUMPSCARE,
  BG_GHOUL_PRE_JUMPSCARE,
  BG_MINISO,
  BG_STORES,
  BG_TACOS,
} = images;

const Scenes = {
  INITIAL: "Scene_Initial",
  START: "Scene_Start",
  WAITING: "Scene_Waiting",
  DIDNT_DOWNLOAD: "Scene_Didnt_Download",
  DID_DOWNLOAD: "Scene_Did_Download",
  DID_TAKE_MORE_PHOTOS: "Scene_Did_take_more_photos",
  // Endings
  DIDNT_TAKE_MORE_PHOTOS: "Scene_Didnt_take_more_photos",
  MINISO: "Scene_Miniso",
  TACOS: "Scene_Tacos",
};

export function TakeThePhoto() {
  const { preloaded, progress } = useImagesPreload(images);

  const BGMS = {
    HAPPY_MOMENTS: useSound("/assets/take-the-photo/sounds/happy_moments.mp3", {
      loop: true,
    }),
    WALKING: useSound("/assets/take-the-photo/sounds/walking.mp3", {
      loop: true,
    }),
    BUSY_STORES: useSound("/assets/take-the-photo/sounds/busy_stores.mp3", {
      loop: true,
    }),
    SURPRISE: useSound("/assets/take-the-photo/sounds/surprise.mp3"),
    CAMERA_SHUTTER: useSound(
      "/assets/take-the-photo/sounds/camera_shutter.mp3"
    ),
    PUNCH: useSound("/assets/take-the-photo/sounds/punch.mp3"),
    WHISPERING: useSound("/assets/take-the-photo/sounds/whispering.mp3", {
      loop: true,
    }),
    LAUGH: useSound("/assets/take-the-photo/sounds/laugh.mp3"),
    JUMPSCARE: useSound("/assets/take-the-photo/sounds/jumpscare.mp3"),
  };

  const scenes = new Map<string, ReactNode>([
    [
      Scenes.INITIAL,
      <Scene key={Scenes.INITIAL}>
        <TitleScreen>
          <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold text-gray-50">CaptureAI</h1>

            <div className="mt-20"></div>

            <div className="text-lg text-center">
              Esta experiencia usa sonidos.
            </div>

            <div className="mt-4"></div>

            <div className="text-lg text-center">
              Si el celular esta en vibración o silencio, por favor cambielo a{" "}
              <span className="font-bold">Sonido</span> y suba el volumen
            </div>

            <div className="mt-10"></div>

            <div className="text-sm text-center">
              Precione en cualquier lugar para continuar...
            </div>
          </div>
        </TitleScreen>

        <BlackScreen />

        <ActionButton to={Scenes.DID_TAKE_MORE_PHOTOS}>Comenzar</ActionButton>
      </Scene>,
    ],
    [
      Scenes.START,
      <Scene key={Scenes.START}>
        <BGM player={BGMS.WALKING} />

        {/* <PortraitBackground src={BG_GHOUL_JUMPSCARE.src} /> */}

        <MobileText>...</MobileText>

        <MobileText>Otro intento para ir a comer con los amigos...</MobileText>

        <MobileText>Ya es la cuarta vez...</MobileText>

        <MobileText>
          Quedamos hace tres semanas y aún así fijo no llega alguien…
        </MobileText>

        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_STORES.src} />

        <MobileText>Bueno toca esperar un ratín.</MobileText>

        <MobileText speaker="???">¡Hey, tiempo sin vernos!</MobileText>

        <MobileText>¿Mmm?</MobileText>

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Oh, Sara. ¿Qué ondas?</MobileText>

        <MobileText speaker="Sara">
          Todo bien. Aqui pensando que tal vez no reconoceré a los demás...
        </MobileText>

        <MobileText speaker="Sara">
          Hace como 10 años no nos reunimos todos.
        </MobileText>

        <MobileText>¿Pucha pareciera, va?</MobileText>

        <MobileText>Si es que llegan...</MobileText>

        <MobileText speaker="Sara">
          Pues, dijeron que sí. Démosles el beneficio de la duda.
        </MobileText>

        <MobileText speaker="Sara">
          No creo que se tarden mucho en llegar.
        </MobileText>

        <MobileText>Bueno, vamos a ver...</MobileText>

        <MobileScreenText>— Varios minutos después —</MobileScreenText>

        <MobileText speaker="Sara">...</MobileText>

        <MobileText speaker="Sara">
          Aish... siempre con estos güirros...
        </MobileText>

        <MobileText speaker="Sara">...</MobileText>

        <MobileText speaker="Sara">
          ¿Qué ondas? ¿Damos una vuelta o seguimos esperando aquí?
        </MobileText>

        <MobileText>Mmm</MobileText>

        <StopBGM />

        <MobileDecision
          options={[
            { label: "Vamos a ver tiendas", to: Scenes.MINISO },
            { label: "Esperemos un poco", to: Scenes.WAITING },
          ]}
        >
          ¿Dar una vuela?
        </MobileDecision>
      </Scene>,
    ],
    [
      Scenes.MINISO,
      <Scene key={Scenes.MINISO}>
        <BGM player={BGMS.BUSY_STORES} />
        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Nah, si. Vamos a dar una vuelta mejor.</MobileText>

        <MobileText>
          Ya se me estan durmiendo los pies de estar aquí.
        </MobileText>

        <MobileText speaker="Sara">
          Igual... Bueno así se nos va mas rapido el tiempo.
        </MobileText>

        <MobileText speaker="Sara">Tal vez miramos algo bueno...</MobileText>

        <BlackScreen />

        <MobileScreenText>
          Caminamos por un rato, viendo las tiendas en el mall...
        </MobileScreenText>

        <MobileScreenText>
          Pero en eso... no podía creer con lo que nos encontramos...
        </MobileScreenText>

        <BlackScreen />

        <BGM player={BGMS.SURPRISE} />

        <MobileText speaker="Sara">
          ¿E- estas viendo lo mismo que yo...?
        </MobileText>

        <MobileText speaker="Sara">
          Esto... no debería de estar aquí...
        </MobileText>

        <MobileText>Imposible...</MobileText>

        <MobileText>Es... es...</MobileText>

        <BGM player={BGMS.HAPPY_MOMENTS} />
        <PortraitBackground src={BG_MINISO.src} />

        <MobileText>¡El especial de Harry Potter en MINISO!</MobileText>

        <MobileScreenText>
          Sara y yo somos fans de Harry Potter
        </MobileScreenText>

        <MobileText speaker="Sara">
          ¡Tendría que ser hasta la siguiente semana! !AHH¡
        </MobileText>

        <MobileText>¡Tienen las bufandas!</MobileText>

        <MobileText speaker="Sara">¡Mira los ositos, que bonitos!</MobileText>

        <MobileScreenText>
          <div className="text-center">
            Compramos lapicez, tazas, peluches, bufandas y almohadas.
          </div>

          <div className="text-center">
            Apenas nos quedaba dinero para la comida despues...
          </div>

          <div className="text-center mt-4">(Pero valió la pena :D)</div>
        </MobileScreenText>

        <MobileScreenText>
          <div className="uppercase text-center mb-4 text-2xl">Final ① / ③</div>
          <div className="text-center text-2xl font-semibold">
            Gracias por jugar
          </div>
        </MobileScreenText>
      </Scene>,
    ],
    [
      Scenes.WAITING,
      <Scene key={Scenes.WAITING}>
        <BGM player={BGMS.BUSY_STORES} />
        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Nah, quedémonos aquí.</MobileText>

        <MobileText>
          No vaya ser que alguien llegue y despues salga con que se fue porque
          no habia nadie, blah, blah.
        </MobileText>

        <MobileText speaker="Sara">Jeja capaz.</MobileText>

        <MobileText>
          Pero bueno. ¿Qué contas de nuevo? ¿Seguís con esas cosas de miedo?
        </MobileText>

        <MobileText speaker="Sara">
          La adicción a eso y a mis tecitos no se me quita :D
        </MobileText>

        <MobileText speaker="Sara">
          Ahorita solo viendo videos de las aplicaciones malditas paso.
        </MobileText>

        <MobileText>¿Aplicaciones malditas? ¿Qué cosas son esas?</MobileText>

        <MobileText speaker="Sara">Son como las Ouijas del ahora.</MobileText>

        <MobileText speaker="Sara">
          Así como chats con demonios, mapas que te dicen donde aparecen
          fantasmas, cosas asi…
        </MobileText>

        <MobileText speaker="Sara">
          Aunque son puras casacas, nada pasa, nadie te escribe y a cada rato te
          salen anuncios.
        </MobileText>

        <MobileText>
          ¿Y qué esperabas poe? Vos como que queres hacerte amiga de un fantasma
          ahí.
        </MobileText>

        <MobileText>
          Llevas tiempo neceando en que queres ver un espíritu chocarrero.
        </MobileText>

        <MobileText speaker="Sara">
          Tal vez el sí llega a las reuniones que hacemos :D
        </MobileText>

        <MobileText>Jajaja ¿Si, va?</MobileText>

        <MobileText speaker="Sara">
          La nueva es una donde tomas una foto...
        </MobileText>

        <MobileText speaker="Sara">
          <span>Y si hay un espíritu la aplicación lo</span>
          <span>&nbsp;</span>
          <span className={cn(CHILLER_FONT.className, "text-3xl text-red-500")}>
            muestra
          </span>
          <span>&nbsp;</span>
          <span>( •̀ᴗ•́ )</span>
        </MobileText>

        <MobileText>(¬_¬ )</MobileText>

        <MobileText speaker="Sara">
          Aunque la verdad lo único que hace es editar las fotos… cuando
          funciona.
        </MobileText>

        <MobileText speaker="Sara">
          Yo la he usado: a veces me edita como filtro de TikTok y otras veces
          sale la foto normal...
        </MobileText>

        <MobileText speaker="Sara">
          Nunca me sale un fantasmita por ahí... (◞‸◟)
        </MobileText>

        <MobileText>Pues... ¿Qué te digo?</MobileText>

        <MobileText speaker="Sara">
          Probémosla aquí mientras esperamos a los otros. Descárgala, talvez no
          funciona por mi cel.
        </MobileText>

        <MobileText>...</MobileText>

        <StopBGM />

        <MobileDecision
          options={[
            { label: "Dale, ahorita la descargo", to: Scenes.DID_DOWNLOAD },
            {
              label: "No gastaré mis datos en esto",
              to: Scenes.DIDNT_DOWNLOAD,
            },
          ]}
        >
          ¿Descargar la aplicación <span>&quot;</span>maldita<span>&quot;</span>
          ?
        </MobileDecision>
      </Scene>,
    ],
    [
      Scenes.DIDNT_DOWNLOAD,
      <Scene key={Scenes.DIDNT_DOWNLOAD}>
        <BGM player={BGMS.BUSY_STORES} />
        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Aish, no tengo espacio...</MobileText>

        <MobileText speaker="Sara">Que codo que sos...</MobileText>
        <MobileText speaker="Sara">...</MobileText>
        <MobileText speaker="Sara">
          Aunque no es que funcionara la verdad.
        </MobileText>
        <MobileText speaker="Sara">( ˶ˆᗜˆ˵ )</MobileText>

        <MobileText>(¬_¬ )</MobileText>

        <MobileText>Vamos a dar una vuela mejor... cipota esta...</MobileText>

        <MobileText speaker="Sara">xD</MobileText>

        <BlackScreen />

        <MobileScreenText>
          Caminamos por un rato, viendo las tiendas en el mall...
        </MobileScreenText>

        <MobileScreenText>
          Pero en eso... no podía creer con lo que nos encontramos...
        </MobileScreenText>

        <BlackScreen />

        <BGM player={BGMS.SURPRISE} />

        <MobileText speaker="Sara">
          ¿E- estas viendo lo mismo que yo...?
        </MobileText>

        <MobileText speaker="Sara">
          Esto... no debería de estar aquí...
        </MobileText>

        <MobileText>Imposible...</MobileText>

        <MobileText>Es... es...</MobileText>

        <BGM player={BGMS.HAPPY_MOMENTS} />
        <PortraitBackground src={BG_MINISO.src} />

        <MobileText>¡El especial de Harry Potter en MINISO!</MobileText>

        <MobileScreenText>
          Sara y yo somos fans de Harry Potter
        </MobileScreenText>

        <MobileText speaker="Sara">
          ¡Tendría que ser hasta la siguiente semana! !AHH¡
        </MobileText>

        <MobileText>¡Tienen las bufandas!</MobileText>

        <MobileText speaker="Sara">¡Mira los osito, que bonitos!</MobileText>

        <MobileScreenText>
          <div className="text-center">
            Compramos lapicez, tazas, peluches, bufandas y almohadas.
          </div>

          <div className="text-center">
            Apenas nos quedaba dinero para la comida despues...
          </div>

          <div className="text-center mt-4">(Pero valió la pena :D)</div>
        </MobileScreenText>

        <MobileScreenText>
          <div className="uppercase text-center mb-4 text-2xl">Final ① / ③</div>
          <div className="text-center text-2xl font-semibold">
            Gracias por jugar
          </div>
        </MobileScreenText>
      </Scene>,
    ],
    [
      Scenes.DID_DOWNLOAD,
      <Scene key={Scenes.DID_DOWNLOAD}>
        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Aish, no tengo espacio...</MobileText>

        <MobileText speaker="Sara">
          Ssh, descargala vos... CaptureAI se llama.
        </MobileText>

        <MobileText>Y que nombrecillo...</MobileText>

        <MobileScreenText>— Unos minutos (y 500Mb) después —</MobileScreenText>

        <MobileText>Ok, ya se bajo.</MobileText>

        <MobileText>Casi me gasto todo el plan, ¿tanto pesa esto?</MobileText>

        <MobileText speaker="Sara">
          Es la <span className="italic">inteligencia artifical</span>... y los{" "}
          <span className={cn(CHILLER_FONT.className, "text-3xl text-red-500")}>
            fantasmas
          </span>{" "}
          ( •̀ᴗ•́ ).
        </MobileText>

        <MobileText>Ay que cipota esta...</MobileText>

        <PortraitBackground src={BG_APP_START.src} />

        <MobileText>Bueno, ya la abrí. ¿Qué ondas ahora?</MobileText>

        <MobileText speaker="Sara">
          Solo toma una foto y si hay un fantasma ahi saldra...{" "}
          <span className="text-xs">supuestamente</span>.
        </MobileText>

        <MobileText speaker="Sara">
          Si sale algo me la mandas. (˶ᵔ ᵕ ᵔ˶)
        </MobileText>

        <MobileText>Dale, dale...</MobileText>

        <PortraitBackground src={BG_APP_FRIEND.src} />

        <MobileText>A ver...</MobileText>

        <BGM player={BGMS.CAMERA_SHUTTER} />

        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_APP_LOADING.src} />

        <MobileText>
          Sale que esta recolectando mi número de identidad y tipo de sangre...
        </MobileText>

        <MobileText speaker="Sara">Mhmm, lo normal. Si, si...</MobileText>

        <PortraitBackground src={BG_APP_FRIEND.src} />

        <MobileText>¡SARA!</MobileText>

        <MobileText speaker="Sara">¿QUÉ? ¿QUÉ PASÓ?</MobileText>

        <MobileText>¡PENSE QUE HABIAS DICHO QUE NO FUNCIONABA!</MobileText>

        <MobileText speaker="Sara">¿SALIÓ ALGO? (O_O)</MobileText>

        <MobileText>Nop, solo es una foto normal tuya.</MobileText>

        <MobileText speaker="Sara">...papo este...</MobileText>

        <MobileText speaker="Sara">(๑╹◡╹)ﾉ🔪</MobileText>

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Osea, no se que esperabas...</MobileText>

        <MobileText speaker="Sara">
          Probemos otra vez... de todos modos ya te gastaste la mitad del plan{" "}
          {">ᴗ<"}
        </MobileText>

        <MobileText>Aish...</MobileText>

        <PortraitBackground src={BG_APP_START.src} />

        <MobileText>A ver, a ver...</MobileText>

        <PortraitBackground src={BG_APP_FRIEND.src} />

        <BGM player={BGMS.CAMERA_SHUTTER} />

        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_APP_LOADING.src} />

        <MobileText speaker="Sara">
          Si sale algo esta vez, yo invito la comida de hoy.
        </MobileText>

        <MobileText>
          Eso es igual a que digas que no trajiste pisto vos.
        </MobileText>

        <PortraitBackground src={BG_APP_FILTER.src} />

        <MobileText>¡OH!</MobileText>

        <MobileText speaker="Sara">¿Salió algo ahora?</MobileText>

        <MobileText>
          Si, si salió algo. No es un fantasma pero si sos vos toda editada.
        </MobileText>

        <MobileText>Toda...</MobileText>

        <MobileText>
          <span>⋆˙⟡</span>
          <span>&nbsp;</span>
          <span className="tracking-widest font-bold italic bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-pink-500 text-transparent">
            Kawaaiiiii
          </span>
          <span>&nbsp;</span>
          <span>˚.🎀༘⋆</span>
        </MobileText>

        <MobileText speaker="Sara">...</MobileText>

        <MobileText>... </MobileText>

        <MobileText speaker="Sara">Detente.</MobileText>

        <MobileText>
          <span className="text-xs">ok</span>
        </MobileText>

        <MobileText speaker="Sara">
          Ah, si. Que pinta esta... Es como te decía: puro TikTok.
        </MobileText>

        <MobileText>Mhmm. Pucha y hasta texto le pone...</MobileText>

        <MobileText>
          <span>&quot;</span>Te encontre<span>&quot;</span> dice...
        </MobileText>

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText speaker="Sara">
          Qué raro porque no hay letras en mi camiseta...
        </MobileText>

        <MobileText speaker="Sara">
          Tal vez tomo las letras del fondo.
        </MobileText>

        <MobileText>Podria ser, podria ser.</MobileText>

        <MobileText speaker="Sara">
          ¿Queres tomar más? ¿A ver que mas edita?
        </MobileText>

        <MobileText>Mmm...</MobileText>

        <StopBGM />

        <MobileDecision
          options={[
            {
              label: "Tomas unas cuantas más",
              to: Scenes.DID_TAKE_MORE_PHOTOS,
            },
            { label: "Paremos aquí", to: Scenes.DIDNT_TAKE_MORE_PHOTOS },
          ]}
        >
          ¿Seguir tomando fotos?
        </MobileDecision>
      </Scene>,
    ],
    [
      Scenes.DIDNT_TAKE_MORE_PHOTOS,
      <Scene key={Scenes.DIDNT_TAKE_MORE_PHOTOS}>
        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>Mmm... paremos por ahora.</MobileText>

        <MobileText>Cuando lleguen los demás nos tomamos más.</MobileText>

        <MobileText speaker="Sara">Ok.</MobileText>

        <MobileText>Ya quiero verlos a ellos también…</MobileText>

        <MobileText>Todos...</MobileText>

        <MobileText>
          <span>⋆˙⟡</span>
          <span>&nbsp;</span>
          <span className="tracking-widest font-bold italic bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-pink-500 text-transparent">
            Kawaa-
          </span>
        </MobileText>

        <BGM player={BGMS.PUNCH} />

        <BGM player={BGMS.BUSY_STORES} />

        <MobileText>
          <span className="text-xs">ok</span>
        </MobileText>

        <MobileText speaker="??? (1)">¡Hey!</MobileText>

        <MobileText speaker="??? (2)">¡Hello, hello!</MobileText>

        <MobileText speaker="??? (3)">
          ¡Ponganlé poe! ¡Que tengo hambre!
        </MobileText>

        <BlackScreen />

        <MobileText speaker="Sara">¡Hey! Hola, hola</MobileText>

        <MobileText>¿Qué ondas ustedes?</MobileText>

        <MobileText>Cuanto tiempo...</MobileText>

        <MobileScreenText>
          No se cuánto tiempo después fue, pero por fin llegaron...
        </MobileScreenText>

        <MobileScreenText>Todo el grupo reunido...</MobileScreenText>

        <BlackScreen />

        <MobileScreenText>
          Estábamos listos para comer, cuando…
        </MobileScreenText>

        <BGM player={BGMS.SURPRISE} />

        <MobileText speaker="??? (2)">Esto no... no puede ser...</MobileText>

        <MobileText speaker="??? (3)">
          Oye, oye, ¿esto no es correcto, verdad?.
        </MobileText>

        <MobileText speaker="??? (3)">... </MobileText>

        <MobileText speaker="??? (3)">
          ¡DIME QUE ESTO NO ES CORRECTO!
        </MobileText>

        <MobileText speaker="??? (1)">
          <span className="text-xs">Santa María ma... ruega por noso...</span>
        </MobileText>

        <MobileText speaker="??? (1)">¡AY NOOOO!</MobileText>

        <MobileText speaker="Sara">Imposible...</MobileText>

        <MobileText speaker="Sara">Esto... esto...</MobileText>

        <BGM player={BGMS.HAPPY_MOMENTS} />
        <PortraitBackground src={BG_TACOS.src} />

        <MobileText speaker="Sara">Se mira deliciosooo</MobileText>

        <MobileText>Uy, si. Nada que ver con las fotos.</MobileText>

        <MobileText speaker="??? (1)">A ver, a ver... ( ´ཀ` )</MobileText>

        <MobileText speaker="??? (1)">(๑ᵔ⤙ᵔ๑)</MobileText>

        <MobileText speaker="??? (1)">Uuuuuuuuuuffffffffff</MobileText>

        <MobileText speaker="??? (1)">Nombe eshta bonisimo (ᵔ⤙ᵔ๑)</MobileText>

        <MobileText speaker="??? (3)">¡Buen provecho!</MobileText>

        <MobileText speaker="Todos">¡Buen provecho!</MobileText>

        <MobileScreenText>
          <div>Por fin fuimos a comer</div>
          <div>Los TikToks no mintieron, estaba super bueno</div>
          <div className="mt-8">
            Comimos hasta que nos tuvimos que desabrochar los pantalones
          </div>
          <div>⸜(｡˃ ᵕ ˂ )⸝♡</div>
        </MobileScreenText>

        <MobileScreenText>
          <div className="uppercase text-center mb-4 text-2xl">Final ② / ③</div>
          <div className="text-center text-2xl font-semibold">
            Gracias por jugar
          </div>
        </MobileScreenText>
      </Scene>,
    ],
    [
      Scenes.DID_TAKE_MORE_PHOTOS,
      <Scene key={Scenes.DID_TAKE_MORE_PHOTOS}>
        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText>
          Dale, dale. Cuando lleguen aquellos, les tomamos a ellos también.
        </MobileText>

        <MobileText speaker="Sara">A ver como salen...</MobileText>

        <MobileText>Mhmm.</MobileText>

        <PortraitBackground src={BG_APP_START.src} />

        <MobileText>Ok..</MobileText>

        <PortraitBackground src={BG_APP_FRIEND.src} />

        <BGM player={BGMS.CAMERA_SHUTTER} />

        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_APP_LOADING.src} />

        <PortraitBackground src={BG_APP_GHOUL_FAR.src} />

        <MobileText>¿Mmm?</MobileText>

        <MobileText speaker="Sara">¿Con qué filtro salgo ahora?</MobileText>

        <MobileText>Nambe, salis normal. Como la primer foto.</MobileText>

        <MobileText speaker="Sara">
          Ash, esa cosa funciona cuando quiere.
        </MobileText>

        <PortraitBackground src={BG_FRIEND.src} />

        <MobileText speaker="Sara">
          Y eso que andas un iPhone 18 Pro Max Ultra Power x1000 ×͜×
        </MobileText>

        <MobileText>Ve, ve, ve. Si esta aplicacioncilla tuya.</MobileText>

        <MobileText>
          A saber de que video todo chueco aprendiste de esta onda.
        </MobileText>

        <MobileText speaker="Sara">Toma otra pues (≧∇≦)...</MobileText>

        <MobileText>Dale, dale...</MobileText>

        <PortraitBackground src={BG_APP_START.src} />

        <MobileText>Voy a llenar la galería de fotos tuyas...</MobileText>

        <PortraitBackground src={BG_APP_FRIEND.src} />

        <BGM player={BGMS.CAMERA_SHUTTER} />

        <BGM player={BGMS.BUSY_STORES} />

        <PortraitBackground src={BG_APP_LOADING.src} />

        <PortraitBackground src={BG_APP_GHOUL_NOT_THAT_FAR.src} />

        <StopBGM />

        <MobileText>¿Mmm?</MobileText>

        <MobileText>...</MobileText>

        <MobileText>¿Qué demonios?</MobileText>

        <MobileText speaker="Sara">¿Nada otra vez?</MobileText>

        <MobileText>No es que... se mira algo al fondo...</MobileText>

        <MobileText>
          Aunque atras de vos no hay nada... ¿Qué es eso...?
        </MobileText>

        <BGM player={BGMS.CAMERA_SHUTTER} />
        <BGM player={BGMS.CAMERA_SHUTTER} />
        <BGM player={BGMS.CAMERA_SHUTTER} />
        <BGM player={BGMS.CAMERA_SHUTTER} />

        <MobileText>!!!</MobileText>
        <MobileText>Que viruseada me pegast-</MobileText>

        <BGM player={BGMS.WHISPERING} />

        <MobileText>
          <span
            className={cn(
              "text-3xl text-red-500 tracking-widest font-semibold",
              CHILLER_FONT.className
            )}
          >
            Te encontré...
          </span>
        </MobileText>

        <PortraitBackground src={BG_APP_START.src} />

        <PortraitBackground src={BG_APP_FRIEND.src} />

        <BGM player={BGMS.CAMERA_SHUTTER} />

        <PortraitBackground src={BG_APP_LOADING.src} />

        <BGM player={BGMS.LAUGH} />

        <PortraitBackground src={BG_APP_GHOUL_CLOSE.src} />

        <BGM player={BGMS.WHISPERING} />

        <MobileText>
          <div
            className={cn(
              "text-red-500 tracking-widest font-semibold break-all",
              CHILLER_FONT.className
            )}
          >
            <span className="text-3xl">Te encontré</span>
            <span>&nbsp;</span>
            <span className="text-xl">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-5xl">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-lg">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-2xl">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-6xl">TE ENCONTRÉ</span>
            <span>&nbsp;</span>
            <span className="text-3xl">Te encontré</span>
            <span>&nbsp;</span>
            <span className="text-xl">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-5xl">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-lg">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-2xl">te encontré</span>
            <span>&nbsp;</span>
            <span className="text-6xl">TE ENCONTRÉ</span>
            <span>&nbsp;</span>
          </div>
        </MobileText>

        <MobileText>Qu- qué...</MobileText>

        <PortraitBackground
          src={BG_GHOUL_PRE_JUMPSCARE.src}
          entranceDuration={0.15}
          durationMs={150}
        />

        <BGM player={BGMS.JUMPSCARE} />

        <PortraitBackground src={BG_GHOUL_JUMPSCARE.src} durationMs={4000} />

        <BlackScreen />

        <BGM player={BGMS.WHISPERING} />

        <MobileScreenText>
          <div>Puedo ver a mis amigos...</div>

          <div>
            Me alegra volverlos a ver reunidos... aunque solo pasan llorando por
            mi...
          </div>

          <div className="mt-8">
            No importa cuanto grite, nunca me escuchan...
          </div>
        </MobileScreenText>

        <MobileScreenText>
          <div>
            Tal vez si uso la aplicación maldita pueda volver a hablar con
            ellos... aunque ahora será... del otro lado...
          </div>
        </MobileScreenText>

        <MobileScreenText>
          <div
            className={cn(
              "uppercase text-center mb-4 text-2xl",
              CHILLER_FONT.className
            )}
          >
            Final ③ / ③
          </div>
          <div
            className={cn(
              "text-center text-5xl font-semibold",
              CHILLER_FONT.className
            )}
          >
            Gracias por jugar
          </div>
        </MobileScreenText>
      </Scene>,
    ],
  ]);

  return (
    <MobileBounds>
      {preloaded ? (
        <GameProvider initialSceneId={Scenes.INITIAL} scenes={scenes}>
          {(render) => (
            <div className={cn("flex h-full w-full flex-col")}>{render()}</div>
          )}
        </GameProvider>
      ) : (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center text-lg"
          )}
        >
          <div>Precargando las imagenes...</div>
          <div className="text-4xl font-bold">{progress}%</div>
        </div>
      )}
    </MobileBounds>
  );
}
