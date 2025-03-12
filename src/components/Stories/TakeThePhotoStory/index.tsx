"use client";

import { ActionButton } from "./ActionButton";
import { BGM, StopBGM } from "../ThePackageStory/BMG";
import { BlackScreen } from "../ThePackageStory/BlackScreen";
import { CHILLER_FONT } from "~/app/fonts";
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
import useSound from "use-sound";
import { useImagesPreload } from "./useImagesPreload";
import * as images from "./images";

const {
  BG_STORES,
  BG_FRIEND,
  BG_APP_START,
  BG_FRIEND_PHOTO,
  BG_MINISO,
  BG_TACOS,
  BG_GHOUL_JUMPSCARE,
  // LOAD_TEST,
} = images;

const Scenes = {
  INITIAL: "Scene_Initial",
  START: "Scene_Start",
  WAITING: "Scene_Waiting",
  MINISO: "Scene_Miniso",
  TACOS: "Scene_Tacos",
};

export function TakeThePhoto() {
  const { preloaded, progress } = useImagesPreload(images);

  const BGMS = {
    HAPPY_MOMENTS: useSound("/assets/take-the-photo/sounds/happy-moments.mp3", {
      loop: true,
    }),
    WALKING: useSound("/assets/take-the-photo/sounds/walking.mp3", {
      loop: true,
    }),
    BUSY_STORES: useSound("/assets/take-the-photo/sounds/busy_stores.mp3", {
      loop: true,
    }),
    // APP_LOADING: useSound("", { loop: true }),
    // MYSTERIOUS: useSound("", { loop: true }),
    // WHISPER: useSound("", { loop: true }),
    // JUMPSCARE: useSound("", { loop: true }),
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

        <ActionButton to={Scenes.MINISO}>Comenzar</ActionButton>
      </Scene>,
    ],
    [
      Scenes.START,
      <Scene key={Scenes.START}>
        <BGM player={BGMS.WALKING} />

        {/* <PortraitBackground src={BG_GHOUL_JUMPSCARE.src} /> */}

        <MobileText>...</MobileText>

        <MobileText>Otro intento para reunirnos...</MobileText>

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

        <StopBGM />

        <MobileDecision
          options={[
            { label: "Dar una vuelta", to: Scenes.MINISO },
            { label: "Seguir esperando", to: Scenes.WAITING },
          ]}
        ></MobileDecision>
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

        <MobileText>
          (Caminamos por un rato, viendo las tiendas en el mall...)
        </MobileText>

        <MobileText>
          (Pero en eso... no podía creer con lo que nos encontramos...)
        </MobileText>

        <StopBGM />

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

        <MobileText>(Sara y yo somos fans de Harry Potter.)</MobileText>

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
      Scenes.WAITING,
      <Scene key={Scenes.WAITING}>
        <MobileText>
          Pero bueno. ¿Y qué contas de nuevo? ¿Seguís con esas cosas de miedo?
        </MobileText>

        <MobileText speaker="Sara">
          La adicción a eso y a mis tecitos no se me quita :D
        </MobileText>

        <MobileText speaker="Sara">
          Ahorita solo viendo videos de las aplicaciones malditas paso.
        </MobileText>

        <MobileText>¿Aplicaciones malditas? ¿Qué tonteras son esas?</MobileText>

        <MobileText speaker="Sara">
          Son como las nuevas Ouijas de ahora.
        </MobileText>

        <MobileText speaker="Sara">
          Así como chats con demonios, mapas que te dicen donde aparecen
          fantasmas, cosas asi…
        </MobileText>

        <MobileText speaker="Sara">
          Aunque son puras casacas, nada pasa, nadie te escribe y a cada rato
          salen anuncios.
        </MobileText>

        <MobileText>
          ¿Y qué esperabas poe? Vos como que queres hacerte amiga de un fantasma
          ahí.
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

        <MobileText>Pues... ¿Qué te digo? xD</MobileText>

        <MobileText speaker="Sara">
          Probémosla aquí mientras esperamos a los otros. Descárgala, talvez no
          funciona por mi cel.
        </MobileText>

        <MobileText>Aysh, no tengo espacio...</MobileText>

        <MobileText speaker="Sara">
          Ssh, descargala vos... CaptureAI se llama.
        </MobileText>

        <MobileText>Y que nombrecillo...</MobileText>

        <MobileScreenText>— Unos minutos después —</MobileScreenText>

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

        <PortraitBackground src={BG_FRIEND_PHOTO.src} />
      </Scene>,
    ],
  ]);

  return (
    <MobileBounds>
      {preloaded ? (
        <GameProvider initialSceneId={Scenes.INITIAL} scenes={scenes}>
          {(render) => (
            <div className="flex h-full w-full flex-col">{render()}</div>
          )}
        </GameProvider>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-lg">
          <div>Precargando las imagenes...</div>
          <div className="text-4xl font-bold">{progress}%</div>
        </div>
      )}
    </MobileBounds>
  );
}
