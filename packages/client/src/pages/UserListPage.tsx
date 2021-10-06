import React, { FC } from 'react';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_USERS = gql`
  query GetUsers {
    users(page: 1, limit: 10) {
      collection {
        id
        email
        firstName
        lastName
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

const columns: GridColDef[] = [
  { field: 'email', headerName: 'Email' },
  { field: 'name', headerName: 'Name' },
  { field: 'role', headerName: 'Role' },
  { field: 'posts', headerName: 'Posts' },
];

const CustomToolbar: FC = () => {
  const onAddNewClick = () => {
    console.log('onAddNewClick');
  };

  return (
    <GridToolbarContainer>
      <Link to={'/users/new'}>Add New</Link>
      <Button variant="contained" onClick={onAddNewClick}>
        Add New
      </Button>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const UserListPage: FC = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={data.users.collection}
        columns={columns}
        loading={false}
        hideFooterSelectedRowCount={true}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default UserListPage;
