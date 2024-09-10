import { useContext } from "react";
import { MainStore } from "./StoreProvider";
import { IStoreList } from "./StoreList";

export const useMainStore = () => useContext<IStoreList>(MainStore);

