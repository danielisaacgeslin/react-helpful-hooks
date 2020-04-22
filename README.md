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
> This hooks is meant to simplify async operations inside components.
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

## Planned for the future
* useQueryParamState
* useStorageState
* useSafeState `check for unmounts`
* useTimer
* useTimerMap
* useStateHistory
