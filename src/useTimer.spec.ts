import { renderHook, act } from '@testing-library/react-hooks';

import { useTimer } from './useTimer';

const executionTimeMargin = 50;
const wait = (time: number) => new Promise<void>(r => setTimeout(r, time));

describe('useTimer', () => {
  it('should start counting time with a given interval', async () => {
    const { result } = renderHook(() => useTimer(100));
    expect(result.current.timer).toBe(0);
    await act(() => wait(200 + executionTimeMargin));
    expect(result.current.timer).toBeGreaterThanOrEqual(200);
    expect(result.current.timer).toBeLessThanOrEqual(200 + executionTimeMargin);
  });

  it('should NOT start counting time when isRunning is set to false', async () => {
    const { result } = renderHook(() => useTimer(100, false));
    expect(result.current.timer).toBe(0);
    await act(() => wait(200 + executionTimeMargin));
    expect(result.current.timer).toEqual(0);
  });

  it('should pause', async () => {
    const { result } = renderHook(() => useTimer(100));
    expect(result.current.timer).toBe(0);
    await act(() => wait(100 + executionTimeMargin));
    act(() => result.current.pause());
    await act(() => wait(100 + executionTimeMargin));
    expect(result.current.isRunning).toBe(false);
    expect(result.current.timer).toBeGreaterThanOrEqual(100);
    expect(result.current.timer).toBeLessThanOrEqual(100 + executionTimeMargin);
  });

  it('should play', async () => {
    const { result } = renderHook(() => useTimer(100));
    expect(result.current.timer).toBe(0);
    await act(() => wait(100 + executionTimeMargin));
    act(() => result.current.pause());
    act(() => result.current.play());
    await act(() => wait(100 + executionTimeMargin));
    expect(result.current.isRunning).toBe(true);
    expect(result.current.timer).toBeGreaterThanOrEqual(200);
    expect(result.current.timer).toBeLessThanOrEqual(200 + executionTimeMargin);
  });

  it('should reset', async () => {
    const { result } = renderHook(() => useTimer(100));
    expect(result.current.timer).toBe(0);
    await act(() => wait(100 + executionTimeMargin));
    expect(result.current.timer).toBeGreaterThanOrEqual(100);
    expect(result.current.timer).toBeLessThanOrEqual(100 + executionTimeMargin);
    act(() => result.current.pause());
    act(() => result.current.reset());
    expect(result.current.timer).toEqual(0);
  });
});
