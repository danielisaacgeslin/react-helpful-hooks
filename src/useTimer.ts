import { useState, useEffect, useCallback } from 'react';

export const useTimer = (interval: number, isRunning = true): { timer: number; isRunning: boolean; pause: () => void; play: () => void; reset: () => void } => {
  const [state, setState] = useState({ delta: 0, time: Date.now(), isRunning });
  const pause = useCallback(() => setState(prevState => ({ ...prevState, isRunning: false })), []);
  const play = useCallback(() => setState(prevState => ({ ...prevState, isRunning: true, time: Date.now() })), []);
  const reset = useCallback(() => setState(prevState => ({ ...prevState, delta: 0, time: Date.now() })), []);
  useEffect(() => {
    if (!state.isRunning) return;
    const timeout = setTimeout(() => {
      const time = Date.now();
      setState(prevState => ({ ...prevState, time, delta: prevState.delta + (time - prevState.time) }));
    }, interval);
    return () => clearTimeout(timeout);
  }, [state.time, state.isRunning]);
  return { timer: state.delta, isRunning: state.isRunning, play, pause, reset };
};
