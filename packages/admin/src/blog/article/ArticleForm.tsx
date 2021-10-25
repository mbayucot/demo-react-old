import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ArticleForm: FC = () => {
  return (
    <div>
      <TextField label="Title" />
      <TextField label="Body" />
    </div>
  );
};

export default ArticleForm;
