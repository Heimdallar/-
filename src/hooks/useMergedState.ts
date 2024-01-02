import * as React from 'react';
import { useSafeState as useState } from 'ahooks';
// import type { DefaultValue } from './useState';

/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use rc-util `useState` hook.
 */
export const useMergedState = <T, R = T>(
  defaultStateValue: T | (() => T),
  option?: {
    defaultValue?: T | (() => T);
    value?: T;
    onChange?: (value: T, prevValue: T) => void;
    postState?: (value: T) => T;
  },
): [R, (value: T, ignoreDestroy?: boolean) => void] => {
  const { defaultValue, value, onChange, postState } = option || {};
  const [innerValue, setInnerValue] = useState<T | (() => T) | undefined>(() => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
    }
    return typeof defaultStateValue === 'function'
      ? (defaultStateValue as any)()
      : defaultStateValue;
  });

  let mergedValue = (value !== undefined ? value : innerValue) as T;
  if (postState) {
    mergedValue = postState(mergedValue);
  }

  // setState
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const triggerChange = React.useCallback(
    (newValue: T) => {
      setInnerValue(newValue);
      if (mergedValue !== newValue && onChangeRef.current) {
        onChangeRef.current(newValue, mergedValue);
      }
    },
    [mergedValue, onChangeRef],
  );

  // Effect of reset value to `undefined`
  const prevValueRef = React.useRef(value);
  React.useEffect(() => {
    if (value === undefined && value !== prevValueRef.current) {
      setInnerValue(value);
    }

    prevValueRef.current = value;
  }, [value]);

  return [mergedValue as unknown as R, triggerChange];
};
