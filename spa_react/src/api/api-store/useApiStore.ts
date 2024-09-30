import { useContext } from "react";
import { ApiStore, IApiList } from "./ApiStoreProvider";

export const useApiStore = () => useContext<IApiList>(ApiStore);
