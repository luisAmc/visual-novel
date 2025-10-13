import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Statement } from "../types";
import { useGame } from "../Game/useGame";

interface BranchContextType {
  branchId: string;
  currentStatementIndex: number;
  registerStatement: (newStatement: Statement) => void;
  getStatementByIndex: (statementIndex: number) => Statement | undefined;
  goToNextStatement: () => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

interface BranchProviderProps {
  branchId: string;
  children: ReactNode;
}

export function BranchProvider({ branchId, children }: BranchProviderProps) {
  const { currentLocation, goToLocation } = useGame();

  const isCurrentBranch = currentLocation.branchId === branchId;

  const currentStatementIndex = isCurrentBranch
    ? currentLocation.statementIndex
    : 0;

  const [statementsByIndex] = useState(() => new Map<number, Statement>());

  const registerStatement = useCallback(
    (newStatement: Statement) => {
      statementsByIndex.set(newStatement.index, newStatement);
    },
    [statementsByIndex]
  );

  function getStatementByIndex(statementIndex: number) {
    return statementsByIndex.get(statementIndex);
  }

  function goToNextStatement() {
    const optimisticNextIndex = currentStatementIndex + 1;
    const statementsAmount = statementsByIndex.size - 1;

    const nextStatement = statementsByIndex.get(
      Math.min(optimisticNextIndex, statementsAmount)
    );

    if (nextStatement) {
      goToLocation({ branchId, statementIndex: nextStatement.index });
    }
  }

  return (
    <BranchContext.Provider
      value={{
        branchId,
        currentStatementIndex,
        registerStatement,
        getStatementByIndex,
        goToNextStatement,
      }}
    >
      <div
        className="select-none flex-1"
        onClick={(event) => {
          const targetContained =
            event.currentTarget === event.target ||
            event.currentTarget.contains(event.target as Element);

          if (!targetContained) {
            return;
          }

          const currentStatement = statementsByIndex.get(currentStatementIndex);

          if (currentStatement?.type.variation.startsWith("skippable")) {
            goToNextStatement();
          }
        }}
      >
        {children}
      </div>
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);

  if (!context) {
    throw new Error("`useBranch` can only be use inside a `Game` component.");
  }

  return context;
}
