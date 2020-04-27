import React, { memo, useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';

import { useTimer } from '../src';

const TestCompo = memo(({ interval, isRunning = true }: { interval: number; isRunning?: boolean }) => {
  const { timer, play, pause, reset } = useTimer(interval, isRunning);
  return (
    <div>
      <div>raw ms: {timer}</div>
      <div>seconds: {(timer / 1000).toFixed(2)}</div>
      <div>round seconds: {Math.round(timer / 1000)}</div>
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
      <button onClick={reset}>reset</button>
    </div>
  );
});

const TestCompo2 = () => {
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const { timer } = useTimer(2000);
  useEffect(() => {
    setNumberOfChildren(Math.round((Math.random() * 10) / 2 + 1));
  }, [timer]);
  return (
    <div>
      {Array.from(Array(numberOfChildren)).map((_, i) => (
        <TestCompo key={i} interval={500} />
      ))}
    </div>
  );
};

storiesOf('useTimer', module).add('Timers', () => (
  <div>
    <h4>500 ms</h4>
    <TestCompo interval={500} />
    <h4>1000 ms</h4>
    <TestCompo interval={1000} />
    <h4>5000 ms</h4>
    <TestCompo interval={5000} />
    <h4>1000 ms starts off</h4>
    <TestCompo interval={1000} isRunning={false} />
    <h4>children that mount and unmount randomly</h4>
    <TestCompo2 />
  </div>
));
