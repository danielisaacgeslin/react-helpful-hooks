# React Helpful Hooks
> A set of helpful react.js hooks

## Install

##### npm
```
npm install react-helpful-hooks --save
```
##### yarn
```
yarn add react-helpful-hooks
```

## Hooks

#### useAsyncCallback
> This hook is meant to simplify async operations inside components.
>
>In this example:
> * `onClick` is the callback function that triggers the async operation.
> * `asyncFunction` is the original async function.
> * `deps` is the dependency array to update `asyncFunction`.
> * `isLoading` will be true after `onClick` was executed but before the promise completes.
> * `error` is the data from the rejected promise.
> * `response` is the data from the resolved promise.
>
> This hook also handle cases where component unmounts before the promise is resolved/rejected
##### Example
```tsx
const [onClick, isLoading, error, response] = useAsyncCallback<Error, Response>(asyncFunction, deps);

<button
  onClick={onClick}
  disabled={isLoading}
>
  click me
</button>
{response && <p>response: {response}</p>}
{error && <p>error: {error}</p>}
```

#### useTimer
> This hook is to be used as a timer, but also works as a timeout or interval if combined with a useEffect
>
>In this example:
> * `timer` is the time elapsed from initialization or the last reset (starting at 0).
> * `play` is a callback to start the timer.
> * `pause` is a callback to pause the timer.
> * `reset` sets the timer at 0. If the timer is running, it will keep running. If the timer is paused, it will remain paused.
> * `interval` is the time interval in milliseconds that will elapse between each tick.
> * `isRunning` is a boolean that represent the current timer state. Defaults to `true`
> * `startsRunning` is the initial state for `isRunning`
>
> Note: the number given back as `timer` represents the elapsed time plus the spent execution time. This means that an interval of 1000ms will most likely have an elapsed time of more than 1000ms (normally by a few milliseconds)
##### Example
```tsx
const { timer, play, pause, reset, isRunning } = useTimer(interval, startsRunning);
```

#### useStateHistory
> This hook uses the same interface as `useState`, but adds the possibility to access the change history
>
>In this example:
> * `state` is the current state, not different as the one from `useState`.
> * `setState` is the state setter, not different as the one from `useState`.
> * `history` is the list of state values that was set. It starts from the latest one.
> * `'initial value'` is the optional initial state value, not different as the one from `useState`.
> * `limit` is the optional history limit. If you set 2, then you will have a max history array of 2 items. When the limit is rached, the oldest value is discarded. Defaults to Infinity.
##### Example
```tsx
const [state, setState, history] = useStateHistory<string>('initial state', limit);
```

## Planned for the future
* useQueryParamState
* useStorageState
* useSafeState `check for unmounts`
