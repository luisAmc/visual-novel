"use client";

import { type ReactNode } from "react";
import { Background } from "~/components/frames/Background";
import { GameProvider } from "~/components/Game/useGame";
import BACKGROUND_ROOM from "/public/assets/bathroom-visit/images/room.webp";
import BACKGROUND_BATHROOM_DOOR from "/public/assets/bathroom-visit/images/bathroom_door.webp";
import { Branch } from "~/components/Branch/Branch";
import { ScreenText } from "~/components/frames/ScreenText";
import { Text } from "~/components/frames/Text";
import { MobileBounds } from "~/components/MobileBounds";
import { BGM } from "~/components/frames/BGM";

const Branches = {
  INITIAL: "Initial",
  END: "End",
} as const;

type BranchId = (typeof Branches)[keyof typeof Branches];

export function TestStory() {
  const branches = {
    [Branches.INITIAL]: (
      <Branch>
        <ScreenText>
          <h1 className="text-8xl text-gray-50 uppercase text-center">
            Visita en el baño
          </h1>

          <div className="text-4xl text-center">
            — Esta experiencia usa sonidos, por favor suba el volumen —
          </div>

          <div className="mt-20 text-5xl text-center">
            Precione en cualquier lugar para continuar...
          </div>
        </ScreenText>

        <BGM
          audio={{
            uri: "/assets/take-the-photo/sounds/happy_moments.mp3",
            loop: true,
          }}
        />

        <Background
          src={BACKGROUND_ROOM.src}
          audio={{
            uri: "/assets/take-the-photo/sounds/jumpscare.mp3",
          }}
        />

        <Text speaker="Yo">
          Siempre que estoy comodo para domir me dan ganas de ir a orinar...
        </Text>

        <Text>Que molestia...</Text>

        <Background
          src={BACKGROUND_BATHROOM_DOOR.src}
          audio={{
            uri: "/assets/take-the-photo/sounds/camera_shutter.mp3",
            // loop: true,
          }}
        />

        <Text>...</Text>

        <Text>*se levanta*</Text>

        <Background src={BACKGROUND_ROOM.src} />

        <ScreenText>
          <div className="uppercase text-center">Fin</div>
          <div className="text-center text-4xl">Gracias por jugar</div>
        </ScreenText>
      </Branch>
    ),
    [Branches.END]: null,
  } satisfies Record<BranchId, ReactNode>;

  const branchesMap = new Map<string, ReactNode>(Object.entries(branches));

  return (
    <div className="bg-rose-100">
      <MobileBounds>
        <GameProvider initialBranchId={Branches.INITIAL} branches={branchesMap}>
          {(render) => <div>{render()}</div>}
        </GameProvider>
      </MobileBounds>
    </div>
  );
}
