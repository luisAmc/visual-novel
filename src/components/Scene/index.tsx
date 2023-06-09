import {
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo
} from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { StatementProvider } from '../Statement/StatementContext';

interface SceneProps {
  children: ReactElement[] | ReactElement;
}

export function Scene({ children }: SceneProps) {
  const statements = useMemo(() => unwrapStatements(children), [children]);

  useEffect(() => {
    console.log("Scene's statements", { statements });
  }, [statements]);

  return (
    <>
      {statements.map((child, index) => (
        <StatementProvider key={child.key} statementIndex={index}>
          {child}
        </StatementProvider>
      ))}
    </>
  );
}

interface LabelProps {
  label: string;
  children: ReactNode;
}

function Label({ children }: LabelProps) {
  return <>{children}</>;
}

function unwrapStatements(children: ReactNode): ReactElement[] {
  return flattenChildren(children)
    .filter(isValidElement)
    .flatMap((child) => {
      if (child.type === Label) {
        const props = child.props as LabelProps;

        const subChildren = unwrapStatements(props.children);

        return [
          <Label key={props.label} label={props.label}>
            {subChildren[0]}
          </Label>,
          ...subChildren.slice(1).map((element) =>
            cloneElement(element, {
              key: `${props.label}.${element.key}`
            })
          )
        ];
      }

      return [child];
    });
}
