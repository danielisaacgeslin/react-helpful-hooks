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
> This hooks is meant to simplify async operations inside components
##### Example
```typescript
const [onClick, isLoading, error, response] = useAsyncCallback<Error>(asyncFunction);
```
