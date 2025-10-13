import { AudioSource, StatementFrame } from "./StatementFrame";

const BGM_FRAME_NAME = "bgm";
const STOP_BGM_FRAME_NAME = "stop_bgm";

interface BGMProps {
  audio: AudioSource;
}

export function BGM({ audio }: BGMProps) {
  return (
    <StatementFrame
      name={BGM_FRAME_NAME}
      audio={audio}
      type={{ variation: "skippable_timed", durationMs: 0 }}
      shownUntil={(statement) =>
        [BGM_FRAME_NAME, STOP_BGM_FRAME_NAME].includes(statement.frameName)
      }
    >
      {() => null}
    </StatementFrame>
  );
}

export function StopBGM() {
  return (
    <StatementFrame
      name={STOP_BGM_FRAME_NAME}
      type={{ variation: "skippable_timed", durationMs: 0 }}
    >
      {() => null}
    </StatementFrame>
  );
}
