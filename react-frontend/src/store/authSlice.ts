import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserDetails } from '../interfaces/user/user';

interface AuthState { isLoggedIn: boolean; user: UserDetails | null; }

const initialState: AuthState = { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserDetails>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<UserDetails>) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;