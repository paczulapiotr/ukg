import classnames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./Container.module.scss";

type Props<T> = {
  name: T;
  focusedSection?: T;
  setFocusedSection?: (section: T) => void;
};

const Container = <TFocusedName,>({
  children,
  name,
  focusedSection,
  setFocusedSection,
}: PropsWithChildren<Props<TFocusedName>>) => {
  const isFocused = focusedSection == name;
  return (
    <div
      onFocusCapture={() => setFocusedSection?.(name)}
      className={classnames(styles.grid, {
        [styles.focused]: isFocused,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
