import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { RTKApi } from "./api";
import authReducer from "./auth/slice";

const rootReducer = combineReducers({
  [RTKApi.reducerPath]: RTKApi.reducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(RTKApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
