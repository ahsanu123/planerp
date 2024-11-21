import { DashboardPageStore } from "../page/dashboard-page/dashboard-page-store";
import { ProjectHistoryPageStore } from "../page/price-history-page/project-history-page-store";
import { ProjectPageStore } from "../page/project-page/project-page-store";
import { IconSelectorStore } from "./shared-store/icon-selector-store";

export const defaultStoreList = {
  dashboardPageStore: new DashboardPageStore(),
  projectPageStore: new ProjectPageStore(),
  iconSelectorStore: new IconSelectorStore(),
  projectHistoryPageStore: new ProjectHistoryPageStore(),
};

export type IStoreList = {
  [key in keyof typeof defaultStoreList]: typeof defaultStoreList[key]
};


