import * as React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Button', module)
  .add('with text', () => <button>Hello button</button>)
  .add('with some emoji', () => <button>😀 😎 👍 💯</button>);
