import { AppStore, makeStore, RootState } from "./store";
import { Provider } from "react-redux";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}

const StoreProvider: React.FC<Props> = ({ children, preloadedState }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
