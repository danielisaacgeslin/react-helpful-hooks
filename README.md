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
In this example "onClick" is the callback function that triggers the async operation and "asyncFunction" is the original async function from which "isLoading", "error" and "response" get their data.
##### Example
```tsx
const [onClick, isLoading, error, response] = useAsyncCallback<Error, Response>(asyncFunction);

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
