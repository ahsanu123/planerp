import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./page/dashboard-page/DashboardPage";
import { ProjectPage } from "./page/project-page/ProjectPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />
  },
  {
    path: 'project',
    element: <ProjectPage />
  }
]);
