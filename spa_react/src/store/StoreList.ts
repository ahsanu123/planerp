import { DashboardPageStore } from "../page/dashboard-page/dashboard-page-store";
import { ProjectPageStore } from "../page/project-page/project-page-store";

export const defaultStoreList = {
  dashboardPageStore: new DashboardPageStore(),
  projectPageStore: new ProjectPageStore(),
};

export type IStoreList = {
  [key in keyof typeof defaultStoreList]: typeof defaultStoreList[key]
};


