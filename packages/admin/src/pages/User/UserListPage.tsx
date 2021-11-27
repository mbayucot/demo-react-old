import React, { FC, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowId,
  GridOverlay,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useQuery, useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { ConfirmDialog, SearchBar, NoRowsOverlay, GET_USERS, DELETE_USER } from '@demo/shared';

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      toolbar: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
    }),
  { defaultTheme },
);

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const CustomToolbar: FC<QuickSearchToolbarProps> = (props: QuickSearchToolbarProps) => {
  let history = useHistory();
  const classes = useStyles();

  const onAddNewClick = () => {
    history.push('/users/new');
  };

  return (
    <GridToolbarContainer className={classes.toolbar}>
      <div>
        <Button variant="contained" onClick={onAddNewClick}>
          Add New
        </Button>
        <GridToolbarExport />
      </div>
      <div>
        <SearchBar value={props.value} onChange={props.onChange} clearSearch={props.clearSearch} />
      </div>
    </GridToolbarContainer>
  );
};

const UserListPage: FC = () => {
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [query, setSearchText] = React.useState('');
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { page, query },
  });
  const [destroyUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<GridRowId>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log('handleConfirm');
    setOpen(false);
    onDeleteUser();
  };

  const editUser = React.useCallback(
    (id: GridRowId) => () => {
      history.push(`/users/${id}/edit`);
    },
    [],
  );

  const onDeleteUser = async () => {
    await destroyUser({
      variables: {
        id: id,
      },
    });

    await refetch();
  };

  const onDeleteClick = React.useCallback(
    (id: GridRowId) => async () => {
      setId(id);
      handleClickOpen();
    },
    [],
  );

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  const setNewPage = (newPage: any) => {
    setPage(newPage + 1);
  };

  const columns = React.useMemo(
    () => [
      { field: 'email', headerName: 'Email' },
      { field: 'name', headerName: 'Name' },
      { field: 'role', headerName: 'Role' },
      { field: 'posts', headerName: 'Posts' },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: any) => [
          <GridActionsCellItem icon={<SecurityIcon />} label="Edit" onClick={editUser(params.id)} showInMenu />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick(params.id)} showInMenu />,
        ],
      },
    ],
    [editUser, destroyUser],
  );

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={data.users.collection}
          columns={columns}
          loading={loading}
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          page={page}
          onPageChange={(newPage) => setNewPage(newPage)}
          pagination
          pageSize={10}
          rowCount={data.users.metadata.totalCount}
          paginationMode="server"
          rowsPerPageOptions={[10]}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: NoRowsOverlay,
          }}
          componentsProps={{
            toolbar: {
              value: query,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
        />
      </div>
      <ConfirmDialog open={open} handleClose={handleClose} handleConfirm={handleConfirm} />
    </>
  );
};

export default UserListPage;
