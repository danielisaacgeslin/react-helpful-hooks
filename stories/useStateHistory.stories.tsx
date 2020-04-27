import React, { memo } from 'react';
import { storiesOf } from '@storybook/react';

import { useStateHistory } from '../src';

const TestCompo = memo(({ limit }: { limit?: number }) => {
  const [state, setState, history] = useStateHistory<string>('initial state', limit);
  return (
    <div>
      <button onClick={() => setState(String(Math.round(Math.random() * 10000)))}>add to history</button>
      <p>current value: "{state}"</p>
      <ol>
        {history.map((item, i) => <li key={i}>{item}</li>)}
      </ol>
    </div>
  );
});


storiesOf('useStateHistory', module)
  .add('Limit 5', () => <TestCompo limit={5} />)
  .add('Limitless', () => <TestCompo />);
