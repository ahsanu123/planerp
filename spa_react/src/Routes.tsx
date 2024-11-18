import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./page/dashboard-page/DashboardPage";
import { ProjectPage } from "./page/project-page/ProjectPage";
import { actionLoaderCollection } from "./api/action-loader-collection";
import { ImageSliderMock } from "./component/shared-component/Swipper";
import { ProjectListPage } from "./page/project-list-page/ProjectListPage";

enum Routes {
  Project = 'project',
  ProjectList = 'project-list',
  SwiperMockup = 'swiper-mockup',
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
    path: Routes.SwiperMockup,
    element: <ImageSliderMock />
  },
  {
    path: Routes.ProjectList,
    errorElement: <ProjectListPage />
  }
]);
