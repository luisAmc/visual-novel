import { AudioSource, StatementFrame } from "./StatementFrame";

const SFX_FRAME_NAME = "sfx";

interface SFXProps {
  audio: AudioSource;
}

export function SFX({ audio }: SFXProps) {
  return (
    <StatementFrame
      name={SFX_FRAME_NAME}
      audio={audio}
      type={{ variation: "skippable_timed", durationMs: 0 }}
    >
      {() => null}
    </StatementFrame>
  );
}
