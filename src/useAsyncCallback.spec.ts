import { renderHook, act } from '@testing-library/react-hooks';

import { useAsyncCallback } from './useAsyncCallback';

const resolve = (res: any) => new Promise(r => setTimeout(() => r(res), 100));
const reject = (err: any) => new Promise((_, r) => setTimeout(() => r(err), 100));

describe('useAsyncCallback', () => {
  it('should initialize values', () => {
    const { result } = renderHook(() => useAsyncCallback(() => new Promise(() => {}), []));
    const [cb, isLoading, error, response] = result.current;
    expect(typeof cb).toEqual('function');
    expect(isLoading).toEqual(false);
    expect(error).toEqual(undefined);
    expect(response).toEqual(undefined);
  });

  it('should change isLoading to true when callback is executed', () => {
    const { result } = renderHook(() => useAsyncCallback(() => new Promise(() => {}), []));
    const [cb] = result.current;
    act(() => {
      cb();
    });
    const [_, isLoading] = result.current;
    expect(isLoading).toEqual(true);
  });

  it('should update error value when promise fails', async () => {
    const promiseError = new Error('intentional error');
    const { result } = renderHook(() => useAsyncCallback(() => Promise.reject(promiseError), []));
    const [cb] = result.current;
    await act(cb);
    const [_, _2, error] = result.current;
    expect(error).toEqual(promiseError);
  });

  it('should update result value when promise fails', async () => {
    const promiseRes = 'a result';
    const { result } = renderHook(() => useAsyncCallback((r: string) => Promise.resolve(r), []));
    const [cb] = result.current;
    await act(() => cb(promiseRes));
    const [_, _2, _3, res] = result.current;
    expect(res).toEqual(promiseRes);
  });

  it('should not return new result states when component unmounts', async () => {
    let { result, unmount } = renderHook(() => useAsyncCallback(() => resolve('a result'), []));
    let [cb] = result.current;
    await act(async () => {
      cb();
      unmount();
      await resolve(null);
    });
    expect(result.current[3]).toEqual(undefined);
  });

  it('should not return new error states when component unmounts', async () => {
    let { result, unmount } = renderHook(() => useAsyncCallback(() => reject('a result'), []));
    let [cb] = result.current;
    await act(async () => {
      cb();
      unmount();
      await resolve(null);
    });
    expect(result.current[2]).toEqual(undefined);
  });
});
