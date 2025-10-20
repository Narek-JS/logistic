import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ token: string }>) {
      // addCookie(StorageEnum.ACCESS_TOKEN, action.payload.token);
      state.token = action.payload.token;
    },
    clearState(state) {
      // removeCookie(StorageEnum.ACCESS_TOKEN, action.payload.token);
      state.token = null;
    },
  },
});

export const { setAccessToken, clearState } = authSlice.actions;
export default authSlice.reducer;
