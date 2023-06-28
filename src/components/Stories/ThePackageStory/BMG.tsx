import useSound from 'use-sound';
import { Action } from '~/components/Action';

interface BGMProps {
  player: ReturnType<typeof useSound>;
}

export function BGM({ player }: BGMProps) {
  return (
    <Action
      name='BGM'
      soundPlayer={{ play: player[0], stop: player[1].stop }}
      statementType={{ variation: 'skippable_timed', durationMs: 0 }}
      until={(statement) =>
        statement.actionName === 'BGM' || statement.actionName === 'StopBGM'
      }
    >
      {() => null}
    </Action>
  );
}
