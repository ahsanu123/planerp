import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./page/dashboard-page/DashboardPage";
import { ProjectPage } from "./page/project-page/ProjectPage";
import { actionLoaderCollection } from "./api/action-loader-collection";
import { DynamicForm } from "./component/dynamic-form/MockDynamicForm";

enum Routes {
  Project = 'project'
}

export const router = createBrowserRouter([
  {
    path: '/',
    loader: actionLoaderCollection.dashboard.getProjectList,
    element: <DashboardPage />
  },
  {
    path: Routes.Project,
    element: <ProjectPage />
  },
  {
    path: 'mock-dynamic-form',
    element: <DynamicForm />
  }
]);
