import React, { ReactElement } from 'react';
import { Button, Input } from '@namespace/components';
import { Counter } from './features/counter/Counter';

const App = (): ReactElement => {
  return (
    <div className="App">
      <Counter />
      <Button />
      <Input />
    </div>
  );
};

export default App;
