import React, { FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';

interface Props {
  props: any;
  classes: any;
}

const SearchBar: FC<Props> = ({ props, classes }) => {
  return (
    <TextField
      variant="standard"
      value={props.value}
      onChange={props.onChange}
      placeholder="Search…"
      className={classes.textField}
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: props.value ? 'visible' : 'hidden' }}
            onClick={props.clearSearch}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchBar;
