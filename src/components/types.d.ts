export type StatementType =
  | { variation: "non_skippable" }
  | { variation: "skippable_instant" }
  | { variation: "skippable_static" }
  | { variation: "skippable_timed"; durationMs: number };

export interface Statement {
  index: number;
  frameName: string;
  type: StatementType;
  enter: () => void;
  shownUntil: number | ((statement: Statement) => boolean);
}
