import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useMemo,
} from "react";
import flattenChildren from "react-keyed-flatten-children";
import { StatementProvider } from "../Statement/useStatement";

interface SceneProps {
  children: Array<ReactElement> | ReactElement;
}

export function Branch({ children }: SceneProps) {
  const statements = useMemo(() => unwrapStatements(children), [children]);

  return (
    <>
      {statements.map((child, index) => (
        <StatementProvider key={child.key} index={index}>
          {child}
        </StatementProvider>
      ))}
    </>
  );
}

interface TagProps {
  tag: string;
  children: ReactNode;
}

function Tag({ children }: TagProps) {
  return <>{children}</>;
}

function unwrapStatements(children: ReactNode): ReactElement[] {
  return flattenChildren(children)
    .filter(isValidElement)
    .flatMap((child) => {
      if (child.type === Tag) {
        const props = child.props as TagProps;

        const subChildren = unwrapStatements(props.children);

        return [
          <Tag key={props.tag} tag={props.tag}>
            {subChildren[0]}
          </Tag>,
          ...subChildren.slice(1).map((element) =>
            cloneElement(element, {
              key: `${props.tag}.${element.key}`,
            })
          ),
        ];
      }

      return [child];
    });
}
