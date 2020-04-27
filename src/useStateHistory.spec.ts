import { renderHook, act } from '@testing-library/react-hooks';

import { useStateHistory } from './useStateHistory';

describe('useStateHistory', () => {
  it('should start with NO initial value', () => {
    const { result } = renderHook(() => useStateHistory());
    const [state, setState, history] = result.current;
    expect(state).toBe(undefined);
    expect(typeof setState).toBe('function');
    expect(history).toEqual([]);
  });

  it('should start with initial value', () => {
    const { result } = renderHook(() => useStateHistory(5));
    const [state, setState, history] = result.current;
    expect(state).toBe(5);
    expect(typeof setState).toBe('function');
    expect(history).toEqual([5]);
  });

  it('should set a new state and keep a history with NO limit when given a new state value', () => {
    const { result } = renderHook(() => useStateHistory());
    /** first value */
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
    expect(result.current[2]).toEqual([5]);
    /** second value */
    act(() => result.current[1](6));
    expect(result.current[0]).toBe(6);
    expect(result.current[2]).toEqual([6, 5]);
    /** third value */
    act(() => result.current[1](7));
    expect(result.current[0]).toBe(7);
    expect(result.current[2]).toEqual([7, 6, 5]);
  });

  it('should set a new state and keep a history when given a set state function', () => {
    const { result } = renderHook(() => useStateHistory<number>());
    /** first value */
    act(() => result.current[1](() => 5));
    expect(result.current[0]).toBe(5);
    expect(result.current[2]).toEqual([5]);
    /** second value */
    act(() => result.current[1](prev => prev + 1));
    expect(result.current[0]).toBe(6);
    expect(result.current[2]).toEqual([6, 5]);
  });

  it('should set a new state and keep a history with a limit', () => {
    const { result } = renderHook(() => useStateHistory<number>(undefined, 2));
    /** first value */
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
    expect(result.current[2]).toEqual([5]);
    /** second value */
    act(() => result.current[1](6));
    expect(result.current[0]).toBe(6);
    expect(result.current[2]).toEqual([6, 5]);
    /** third value */
    act(() => result.current[1](7));
    expect(result.current[0]).toBe(7);
    expect(result.current[2]).toEqual([7, 6]);
  });
});
