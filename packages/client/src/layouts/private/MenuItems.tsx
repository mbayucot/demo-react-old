import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';

export const MenuItems = () => {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push('/posts')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
    </div>
  );
};
