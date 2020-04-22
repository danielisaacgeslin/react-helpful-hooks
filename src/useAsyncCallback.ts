import { useState, useCallback, useRef, useEffect, DependencyList } from 'react';

export const useAsyncCallback = <E = any, T = any>(fn: () => Promise<any>, deps: DependencyList): [() => Promise<void>, boolean, E, T] => {
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
  const runAsync = useCallback(async () => {
    try {
      setState(s => ({ ...s, isLoading: true }));
      const r = await fn();
      if (isMounted.current) setState(s => ({ ...s, error: undefined, response: r }));
    } catch (error) {
      if (isMounted.current) setState(s => ({ ...s, error }));
    } finally {
      if (isMounted.current) setState(s => ({ ...s, isLoading: false }));
    }
  }, [isMounted, setState, ...deps]);
  return [runAsync, state.isLoading, state.error as E, state.response as T];
};
