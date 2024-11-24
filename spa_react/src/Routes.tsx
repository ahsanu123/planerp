import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./page/dashboard-page/DashboardPage";
import { ProjectPage } from "./page/project-page/ProjectPage";
import { actionLoaderCollection } from "./api/action-loader-collection";
import { ImageSliderMock } from "./component/shared-component/Swipper";
import { ProjectListPage } from "./page/project-list-page/ProjectListPage";
import { JsonValuePicker } from "./component/shared-component";
import { TableComponent } from "./component/shared-component/table-component/TableComponent";
import { PriceHistoryPage } from "./page/price-history-page/PriceHistoryPage";

enum Routes {
  Project = 'project',
  ProjectList = 'project-list',
  SwiperMockup = 'swiper-mockup',
  JsonValuePickerMock = 'json-value-picker',
  TableComponentMock = 'table-component-mock',
  PriceHistoryPage = 'price-history-page'
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
    element: <ProjectListPage />
  },
  {
    path: Routes.TableComponentMock,
    element: <TableComponent />
  },
  {
    path: Routes.PriceHistoryPage,
    element: <PriceHistoryPage />
  },
]);
