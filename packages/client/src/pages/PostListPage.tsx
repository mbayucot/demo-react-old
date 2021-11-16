import React, { FC } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, title: 'Hello world!', author: 'admin', date: 'Published 2021/10/02 at 11:55 pm' },
  { id: 2, title: 'Hello world!', author: 'admin', date: 'Published 2021/10/02 at 11:55 pm' },
  { id: 3, title: 'Hello world!', author: 'admin', date: 'Published 2021/10/02 at 11:55 pm' },
];

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title' },
  { field: 'author', headerName: 'Author' },
  { field: 'date', headerName: 'Date' },
];

const PostListPage: FC = () => {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} loading={false} hideFooterSelectedRowCount={true} />
    </div>
  );
};

export default PostListPage;
