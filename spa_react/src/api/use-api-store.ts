import { useContext } from "react";
import { IApiStore } from "./default-api-store";
import { ApiStore } from "./api-provider";

export const useApiStore = () => useContext<IApiStore>(ApiStore);
