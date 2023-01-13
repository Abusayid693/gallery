import { useCallback, useEffect, useRef, useState } from 'react';

export const useLazyState = <D>(
  initialValue: D
): [D, (newValue: any, callback?: (state: D) => void) => void] => {
  const callbackRef = useRef(null);

  const [value, setValue] = useState<D>(initialValue);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = useCallback((newValue, callback?: (state: D) => void) => {
    if (callback) callbackRef.current = callback;

    return setValue(newValue);
  }, []);

  return [value, setValueWithCallback];
};
