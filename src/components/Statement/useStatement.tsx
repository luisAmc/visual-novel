import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useBranch } from "../Branch/useBranch";
import { Statement } from "../types";

interface StatementContextType {
  index: number;
  isCurrent: boolean;
  isVisible: boolean; // Like a background behind a text box, not current but visible
  register: (statement: Omit<Statement, "index">) => void;
}

const StatementContext = createContext<StatementContextType | undefined>(
  undefined
);

interface StatementProviderProps {
  index: number;
  children: ReactNode;
}

export function StatementProvider({ index, children }: StatementProviderProps) {
  const { currentStatementIndex, registerStatement, getStatementByIndex } =
    useBranch();

  const [statement, setStatement] = useState<Statement | null>(null);

  const register = useCallback(
    (newStatement: Omit<Statement, "index">) => {
      const statement = { ...newStatement, index };

      setStatement(statement);

      registerStatement(statement);
    },
    [index]
  );

  const isCurrent = index === currentStatementIndex;

  let isVisible = isCurrent;

  const isCurrentInFront = currentStatementIndex > index;

  if (isCurrentInFront) {
    if (statement?.shownUntil === -1) {
      isVisible = true;
    } else if (typeof statement?.shownUntil === "number") {
      isVisible = currentStatementIndex <= index + statement.shownUntil;
    } else {
      isVisible = true;

      let futureStatementIndex = index + 1;
      let futureStatement = getStatementByIndex(futureStatementIndex);

      while (
        futureStatementIndex <= currentStatementIndex &&
        futureStatement != null
      ) {
        if (statement?.shownUntil(futureStatement)) {
          isVisible = false;
          break;
        }

        futureStatementIndex += 1;
        futureStatement = getStatementByIndex(futureStatementIndex);
      }
    }
  }

  return (
    <StatementContext.Provider
      value={{ index, isCurrent, isVisible, register }}
    >
      {children}
    </StatementContext.Provider>
  );
}

export function useStatement() {
  const context = useContext(StatementContext);

  if (!context) {
    throw new Error(
      "`useStatement` can only be use inside a `Branch` component."
    );
  }

  return context;
}
