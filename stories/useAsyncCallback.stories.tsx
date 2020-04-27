import React, { useState, memo, useEffect } from 'react';
import { storiesOf } from '@storybook/react';

import { useAsyncCallback } from '../src';

const TestCompo = memo(({ fail }: { fail?: boolean }) => {
  const [title, setTitle] = useState('');
  const [onSave, isLoding, error, response] = useAsyncCallback(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => (fail ? reject(`intentional error at ${new Date().toLocaleString()}`) : resolve({ title, date: new Date() })), 600)
      ),
    [title]
  );

  useEffect(() => {
    setTitle('');
  }, [response]);

  return (
    <div>
      <h1>useAsyncCallback</h1>
      <input value={title} onChange={event => setTitle(event.target.value)} />
      <button onClick={onSave} disabled={isLoding || !title}>
        {isLoding ? 'loading...' : 'save'}
      </button>
      {response && (
        <div>
          <p>title: {response.title}</p>
          <p>title: {response.date.toLocaleString()}</p>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>error: {error}</div>}
    </div>
  );
});

storiesOf('useAsyncCallback', module)
  .add('Success', () => <TestCompo />)
  .add('Error', () => <TestCompo fail={true} />);
