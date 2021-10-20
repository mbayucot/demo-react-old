import React, { FC, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowId,
  GridOverlay,
  GridSortModel,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const GET_POSTS = gql`
  query GetPosts($page: Int, $query: String!, $sort: String!) {
    posts(page: $page, query: $query, sort: $sort) {
      collection {
        id
        title
        body
        slug
      }
      metadata {
        totalPages
        totalCount
        currentPage
        limitValue
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation destroyPost($id: ID!) {
    destroyPost(id: $id) {
      post {
        id
        title
      }
    }
  }
`;

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        flexDirection: 'column',
        '& .ant-empty-img-1': {
          fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
        '& .ant-empty-img-2': {
          fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
        },
        '& .ant-empty-img-3': {
          fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
        },
        '& .ant-empty-img-4': {
          fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
        },
        '& .ant-empty-img-5': {
          fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
          fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
        },
      },
      label: {
        marginTop: theme.spacing(1),
      },
      toolbar: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
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
      </div>
    </GridToolbarContainer>
  );
};

const CustomNoRowsOverlay = () => {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg width="120" height="100" viewBox="0 0 184 152" aria-hidden focusable="false">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Rows</div>
    </GridOverlay>
  );
};

const PostListPage: FC = () => {
  const [page, setPage] = useState(0);
  const [query, setSearchText] = React.useState('');
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'date', sort: 'asc' }]);

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: { page, query, sort: sortModel.length === 0 ? 'asc' : sortModel[0].sort },
  });
  const [destroyPost] = useMutation(DELETE_POST);
  let history = useHistory();

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
      { field: 'author', headerName: 'Author', width: 150 },
      { field: 'date', headerName: 'Date', width: 150 },
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
            NoRowsOverlay: CustomNoRowsOverlay,
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostListPage;
