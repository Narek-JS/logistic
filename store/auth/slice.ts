import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "client" | "driver" | null;

interface AuthState {
  token: string | null;
  role: Role;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ token: string }>) {
      // addCookie(StorageEnum.ACCESS_TOKEN, action.payload.token);
      state.token = action.payload.token;
    },
    setRole(state, action: PayloadAction<{ role: Role }>) {
      state.role = action.payload.role;
    },
    clearState(state) {
      // removeCookie(StorageEnum.ACCESS_TOKEN, action.payload.token);
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAccessToken, setRole, clearState } = authSlice.actions;
export default authSlice.reducer;
