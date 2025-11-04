import type { RootState } from "../store";

export const selectAuthRole = (state: RootState) => state.auth.role;
export const selectToken = (state: RootState) => state.auth.token;
