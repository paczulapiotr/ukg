import classnames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./Container.module.scss";

type Props<T> = {
  readonly?: boolean;
  name: T;
  focusedSection?: T;
  setFocusedSection?: (section: T) => void;
};

const Container = <TFocusedName,>({
  readonly,
  children,
  name,
  focusedSection,
  setFocusedSection,
}: PropsWithChildren<Props<TFocusedName>>) => {
  const isFocused = focusedSection == name && !readonly;
  return (
    <div
      onFocusCapture={() => setFocusedSection?.(name)}
      className={classnames(styles.grid, {
        [styles.focused]: isFocused,
        [styles.readonly]: readonly,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
