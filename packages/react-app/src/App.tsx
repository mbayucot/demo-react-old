import React, { ReactElement } from 'react';
import { Input } from '@namespace/components';
import Button from '@mui/material/Button';

const App = (): ReactElement => {
  return (
    <div className="App">
      <Button variant="contained">Hello World</Button>
      <Input />
    </div>
  );
};

export default App;
