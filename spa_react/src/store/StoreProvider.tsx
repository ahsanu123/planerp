import { createContext } from "react";
import { defaultStoreList, IStoreList } from "./StoreList";

export const MainStore = createContext<IStoreList>(defaultStoreList);

export const StoreProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const {
    children
  } = props;
  return (
    <MainStore.Provider value={defaultStoreList}>
      {children}
    </MainStore.Provider>
  );
};
