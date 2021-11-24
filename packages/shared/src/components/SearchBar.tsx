import React, { FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

interface Props {
  value: string;
  onChange: () => void;
  clearSearch: () => void;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme },
);

const SearchBar: FC<Props> = ({ value, onChange, clearSearch }) => {
  const classes = useStyles();

  return (
    <TextField
      variant="standard"
      value={value}
      onChange={onChange}
      placeholder="Search…"
      className={classes.textField}
      inputProps={{ 'data-testid': 'searchfield' }}
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? 'visible' : 'hidden' }}
            onClick={clearSearch}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchBar;
