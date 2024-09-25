import { createContext } from "react";
import { defaultApiStore } from "./default-api-store";

export const ApiStore = createContext(defaultApiStore);

export const ApiStoreProvider: React.FC<{ children?: React.ReactNode }> = (props) => {

  const {
    children
  } = props;

  return (
    <ApiStore.Provider value={defaultApiStore}>
      {children}
    </ApiStore.Provider>
  );
};
