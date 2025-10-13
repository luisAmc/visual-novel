import { Action } from '.';
import { BaseActionProps } from './BaseAction';

type SoundProps = Pick<BaseActionProps, 'audioControls'>;

export function Sound({ audioControls }: SoundProps) {
  return (
    <Action
      name='Sound'
      audioControls={audioControls}
      statementType={{ variation: 'skippable_timed', durationMs: 0 }}
    >
      {() => null}
    </Action>
  );
}
