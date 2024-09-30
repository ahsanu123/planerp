import { createContext } from "react";
import { FileUtils } from "./file-utils";

export interface IApiList {
  fileUtils: FileUtils
}

const defaultApiList: IApiList = {
  fileUtils: new FileUtils(),
};

export const ApiStore = createContext<IApiList>(defaultApiList);

export const ApiProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const {
    children
  } = props;
  return (
    <ApiStore.Provider value={defaultApiList}>
      {children}
    </ApiStore.Provider>
  );
};
