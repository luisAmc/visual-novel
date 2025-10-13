import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { useScene } from '../Scene/SceneContext';

export type StatementType =
  | { variation: 'non_skippable' }
  | { variation: 'skippable_static' }
  | { variation: 'skippable_timed'; durationMs: number };

export interface Statement {
  index: number;
  actionName: string;
  step: number;
  type: StatementType;

  // the amount of statements until this statement is hidden
  until: number | ((statement: Statement) => boolean);
  enter: () => void;
}

interface StatementContextType {
  register: (statement: Omit<Statement, 'index'>) => void;
  statementIndex: number;

  // Is the statement the current statement?
  focused: boolean;

  // Is the statement shown but is not the current one?
  // Like if it's being displayed behind another one
  visible: boolean;
}

const StatementContext = createContext<StatementContextType | null>(null);

interface StatementProviderProps {
  statementIndex: number;
  children: ReactNode;
}

export function StatementProvider({
  statementIndex,
  children
}: StatementProviderProps) {
  const scene = useScene();

  const [statement, setStatement] = useState<Statement | null>(null);

  const register = useCallback(
    (newStatement: Omit<Statement, 'index'>) => {
      const statement = { ...newStatement, index: statementIndex };

      setStatement(statement);

      return scene.registerStatement(statement);
    },
    [scene, statementIndex]
  );

  const context = useMemo((): StatementContextType => {
    const focused = scene.focusedStatementIndex === statementIndex;

    let visible = focused;

    const isFocusHigher = scene.focusedStatementIndex > statementIndex;

    if (isFocusHigher) {
      if (statement?.until === -1) {
        visible = true;
      } else if (typeof statement?.until === 'number') {
        visible =
          scene.focusedStatementIndex <= statementIndex + statement?.until;
      } else if (typeof statement?.until === 'function') {
        visible = true;

        let pivotStatementIndex = statementIndex + 1;
        let pivotStatement = scene.getStatementByIndex(pivotStatementIndex);

        while (
          pivotStatementIndex <= scene.focusedStatementIndex &&
          pivotStatement != null
        ) {
          if (statement.until(pivotStatement)) {
            visible = false;
            break;
          } else {
            pivotStatementIndex += 1;
            pivotStatement = scene.getStatementByIndex(pivotStatementIndex);
          }
        }
      }
    }

    return {
      register,
      statementIndex,
      focused,
      visible
    };
  }, [statementIndex, scene, statement, register]);

  return (
    <StatementContext.Provider value={context}>
      {children}
    </StatementContext.Provider>
  );
}

export function useStatement() {
  const context = useContext(StatementContext);

  if (!context) {
    throw new Error(
      '`useStatement` can only be use inside an `Action` component.'
    );
  }

  return context;
}
