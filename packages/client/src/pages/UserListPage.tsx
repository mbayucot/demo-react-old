import React, { FC } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, email: 'demos@softaculous.com', name: 'test test', role: 'Administrator', posts: '1' },
  { id: 2, email: 'demos@softaculous.com', name: 'test test', role: 'Author', posts: '1' },
  { id: 3, email: 'demos@softaculous.com', name: 'test test', role: 'Author', posts: '1' },
];

const columns: GridColDef[] = [
  { field: 'email', headerName: 'Email' },
  { field: 'name', headerName: 'Name' },
  { field: 'role', headerName: 'Role' },
  { field: 'posts', headerName: 'Posts' },
];

const UserListPage: FC = () => {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} loading={false} hideFooterSelectedRowCount={true} />
    </div>
  );
};

export default UserListPage;
