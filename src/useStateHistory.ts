import { useState, Dispatch, SetStateAction } from 'react';

export const useStateHistory = <T>(initialValue?: T, limit: number = Infinity): [T, Dispatch<SetStateAction<T>>, T[]] => {
  const [history, setHistory] = useState<T[]>([initialValue].filter(v => v !== undefined) as T[]);
  const setState = (s: T | ((p: T) => T)) =>
    setHistory(prevState => [typeof s === 'function' ? (s as Function)(prevState[0]) : s, ...prevState].slice(0, limit));
  return [history[0], setState, history];
};
