import { AnimatePresence } from "framer-motion";
import { Frame, FrameInstance, FrameProps } from "./Frame";
import { useStatement } from "../Statement/useStatement";
import { useEffect, useRef, useState } from "react";
import { Statement } from "../types";
import useSound from "use-sound";

export interface AudioSource {
  uri: string;
  loop?: boolean;
}

interface StatementFrameProps
  extends Partial<Pick<Statement, "shownUntil">>,
    Pick<FrameProps, "children">,
    Partial<Pick<FrameProps, "type">> {
  name: string;
  audio?: AudioSource | null;
}

export function StatementFrame({
  name,
  type = { variation: "skippable_static" },
  audio: audioSrc = null,
  shownUntil = 0,
  children,
}: StatementFrameProps) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { isVisible, register } = useStatement();

  const frameRef = useRef<FrameInstance>(null);

  // const whileVisibleAudio = useAudio(
  //   audio?.whileVisible
  //     ? {
  //         channel: "main",
  //         ...audio.whileVisible,
  //       }
  //     : null
  // );

  const whileVisibleAudio = audioSrc
    ? useSound(audioSrc.uri, {
        loop: audioSrc.loop,
        volume: 1,
      })
    : null;

  useEffect(() => {
    register({
      frameName: name,
      type,
      shownUntil,
      enter: () => frameRef.current?.enter ?? false,
    });
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      if (isVisible) {
        whileVisibleAudio?.[0]();
        // void whileVisibleAudio?.play();
      } else {
        whileVisibleAudio?.[1].stop();

        // if (whileVisibleAudio) {
        //   if (whileVisibleAudio.src.overlap) {
        //     void whileVisibleAudio.stop();
        //   } else {
        //      whileVisibleAudio.stop();
        //   }
        // }
        // whileVisibleAudio?.stop();
      }
    }
  }, [isVisible]);

  useEffect(() => {}, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Frame ref={frameRef} type={type}>
          {children}
        </Frame>
      )}
    </AnimatePresence>
  );
}
