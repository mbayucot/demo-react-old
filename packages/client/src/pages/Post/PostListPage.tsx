import React, { FC, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowId,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ConfirmDialog, SearchBar, NoRowsOverlay } from '@demo/shared';
import { GET_ALL_POSTS, DELETE_POST } from '@demo/shared';

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
    history.push('/posts/new');
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

const PostListPage: FC = () => {
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [query, setSearchText] = React.useState('');
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'date', sort: 'asc' }]);

  const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS, {
    variables: { page, query, sort: sortModel.length === 0 ? 'asc' : sortModel[0].sort },
  });
  const [destroyPost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<GridRowId>();

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    onDeleteUser();
  };

  const editPost = React.useCallback(
    (id: GridRowId) => () => {
      history.push(`/posts/${id}/edit`);
    },
    [],
  );

  const onDeleteUser = async () => {
    await destroyPost({
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
      { field: 'title', headerName: 'Title', width: 150 },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) => `${params.row.user.firstName} ${params.row.user.lastName}`,
      },
      { field: 'updatedAt', headerName: 'Date', width: 150 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: any) => [
          <GridActionsCellItem icon={<SecurityIcon />} label="Edit" onClick={editPost(params.id)} showInMenu />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={onDeleteClick(params.id)} showInMenu />,
        ],
      },
    ],
    [editPost, destroyPost],
  );

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          autoHeight
          rows={data.posts.collection}
          columns={columns}
          loading={loading}
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          page={page}
          onPageChange={(newPage) => setNewPage(newPage)}
          pagination
          pageSize={10}
          rowCount={data.posts.metadata.totalCount}
          paginationMode="server"
          rowsPerPageOptions={[10]}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
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

export default PostListPage;
