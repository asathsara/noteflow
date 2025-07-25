import { DependencyList, useEffect } from "react";

export function useDebouncedEffect(
  effect: () => void | (() => void),
  deps: DependencyList,
  delay: number
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]); 
}
