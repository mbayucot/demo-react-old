import { createSlice } from '@reduxjs/toolkit';

export enum Role {
  Author = 'Author',
  Editor = 'Editor',
  Admin = 'Admin',
}

interface Model {
  id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface User extends Model {
  email: string;
  role: string;
  role_fmt?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  avatar?: string;
}

export interface Post extends Model {
  name: string;
  created_by?: number;
  //readonly client?: User;
}

type StateType = {
  isAuthenticated: boolean;
  loader: boolean;
  user?: User;
  error?: string;
};

const initialState: StateType = {
  isAuthenticated: false,
  loader: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state) {
      state.loader = true;
    },
    loginSuccess(state, action) {
      state.loader = false;
      state.isAuthenticated = !!action.payload;
      const data = action.payload.user;
      const user: User = {
        id: data.email,
        email: data.email,
        role: data.role_fmt,
      };
      state.user = user;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      state.error = action.payload;
    },
    logout(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
    },
    logoutSuccess(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      localStorage.removeItem('token');
    },
    logoutFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = undefined;
      state.error = action.payload;
    },
  },
});

export const { login, logout, loginSuccess, loginFailure, logoutSuccess, logoutFailure } = authenticationSlice.actions;
export default authenticationSlice.reducer;
