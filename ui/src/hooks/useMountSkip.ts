import { useEffect, useRef } from 'react';
/**
 * Triggers callback function when deps update skipping initial mount
 * @param deps dependency array for useEffect hook
 * @param func callback - triggered on keydown event 
 */
export const useMountSkip = (func: () => any, deps: any[]) => {
  const didMount = useRef(0);

  useEffect(() => {
    if (didMount.current === 2) func();
    else didMount.current = didMount.current+1;
  }, deps);
};
