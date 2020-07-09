import { useState, useCallback, useRef, useEffect, DependencyList } from 'react';

export const useAsyncCallback = <E = any, T = any, F = (args?: any) => Promise<void>>(
  fn: (args?: any) => Promise<any>,
  deps: DependencyList
): [F, boolean, E, T] => {
  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );
  const [state, setState] = useState<{
    isLoading: boolean;
    error?: E;
    response?: T;
  }>({ isLoading: false, error: undefined, response: undefined });
  const runAsync: unknown = useCallback(
    async (...args: any[]) => {
      try {
        setState(s => ({ ...s, isLoading: true }));
        const r = await fn(...args);
        if (isMounted.current) setState(s => ({ ...s, error: undefined, response: r, isLoading: false }));
      } catch (error) {
        if (isMounted.current) setState(s => ({ ...s, error, isLoading: false }));
      }
    },
    [isMounted, setState, ...deps] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return [runAsync as F, state.isLoading, state.error as E, state.response as T];
};
