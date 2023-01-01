import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { useSceneContext } from './SceneContext';

export type StatementBehavior =
    | ['skippable_timed', { durationMs: number }]
    | ['skippable_static']
    | ['non_skippable'];

export interface Statement {
    index: number;
    label: string | null;
    actionName: string;
    behavior: StatementBehavior;

    /**
     * number: the amount of statements until this statement is hidden
     * (statement: Statement) => boolean: the statement is shown until
     *  a statement with a specific action name is rendered
     */
    showUntil: number | ((statement: Statement) => boolean);
    next: number | string;
    enter: () => void;
}

interface StatementContextType {
    register: (statement: Omit<Statement, 'index' | 'label'>) => void;
    statementIndex: number;
    statementLabel: string | null;

    /** Is the statement the current statement  */
    focused: boolean;

    /**
     * Is the statement shown but is not the current one,
     * like if it is displayed behind another one
     * */
    visible: boolean;
}

const StatementContext = createContext<StatementContextType | null>(null);

interface StatementProviderProps {
    statementIndex: number;
    statementLabel?: string | null;
    children: ReactNode;
}

export function StatementProvider({
    statementIndex,
    statementLabel = null,
    children,
}: StatementProviderProps) {
    const sceneContext = useSceneContext();

    const [statement, setStatement] = useState<Statement | null>(null);

    const register = useCallback(
        (newStatement: Omit<Statement, 'index' | 'label'>) => {
            const statement = {
                ...newStatement,
                index: statementIndex,
                label: statementLabel,
            };

            setStatement(statement);

            return sceneContext.registerStatement(statement);
        },
        [sceneContext, statementIndex, statementLabel]
    );

    const context = useMemo(() => {
        const focused = sceneContext.focusedStatementIndex === statementIndex;

        let visible = focused;

        if (sceneContext.focusedStatementIndex > statementIndex) {
            if (statement?.showUntil === -1) {
                visible = true;
            } else if (typeof statement?.showUntil === 'number') {
                visible =
                    sceneContext.focusedStatementIndex <=
                    statementIndex + statement.showUntil;
            } else if (typeof statement?.showUntil === 'function') {
                visible = true;

                let currentStatementIndex = statementIndex + 1;
                let currentStatement = sceneContext.getStatement(
                    currentStatementIndex
                );

                while (
                    currentStatementIndex <=
                        sceneContext.focusedStatementIndex &&
                    currentStatement != null
                ) {
                    if (statement.showUntil(currentStatement)) {
                        visible = false;
                        break;
                    } else {
                        currentStatementIndex += 1;
                        currentStatement = sceneContext.getStatement(
                            currentStatementIndex
                        );
                    }
                }
            }
        }

        return {
            register,
            statementIndex,
            statementLabel,
            focused,
            visible,
        };
    }, [sceneContext, register, statement, statementIndex, statementLabel]);

    return (
        <StatementContext.Provider value={context}>
            {children}
        </StatementContext.Provider>
    );
}

export function useStatementContext() {
    const context = useContext(StatementContext);

    if (!context) {
        throw new Error(
            '`useStatementContext` can only be used inside a Action component.'
        );
    }

    return context;
}
