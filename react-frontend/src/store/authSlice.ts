import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserDetails } from '../interfaces/user/user';

interface AuthState {
  isLoggedIn: boolean;
  user: UserDetails | null;
}

const storedUser = localStorage.getItem("userData");
const initialState: AuthState = {
  isLoggedIn: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserDetails>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("userData");
    },
    setUser(state, action: PayloadAction<UserDetails>) {
      state.user = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;