import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./page/DasboardPage";
import { SigninPage } from "./page/SigninPage";
import { SignupPage } from "./page/SignupPage";
import { ClaimPage } from "./page/ClaimPage";
import { RolePage } from "./page/RolePage";
import { ErrorPage } from "./component/ErrorPage";

export enum Routes {
  SignInPage = "sign-in-page",
  SignUpPage = "sign-up-page",
  DashboardPage = "dashboard-page",
  ClaimPage = "claim-page",
  RolePage = "role-page",
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <ErrorPage />
  },
  {
    path: Routes.SignInPage,
    element: <SigninPage />
  },
  {
    path: Routes.SignUpPage,
    element: <SignupPage />
  },
  {
    path: Routes.ClaimPage,
    element: <ClaimPage />
  },
  {
    path: Routes.RolePage,
    element: <RolePage />
  },

])
