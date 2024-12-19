import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export enum AppRoutes {
  PagePrefix = "page/",

  ClaimPage = "claim-page",
  RolePage = "role-page",
  SigninPage = "signin-page",
  SignupPage = "signup-page",
  ListUserPage = "list-user-page",
}

export default [
  layout("./layout/HomePage.tsx", [
    index("./page/DashboardPage.tsx")
  ]),
  layout("./layout/PageContainer.tsx", [
    route(`${AppRoutes.PagePrefix}${AppRoutes.ClaimPage}`, "./page/ClaimPage.tsx"),
    route(`${AppRoutes.PagePrefix}${AppRoutes.RolePage}`, "./page/RolePage.tsx"),
    route(`${AppRoutes.PagePrefix}${AppRoutes.SignupPage}`, "./page/SignupPage.tsx"),
    route(`${AppRoutes.PagePrefix}${AppRoutes.SigninPage}`, "./page/SigninPage.tsx"),
    route(`${AppRoutes.PagePrefix}${AppRoutes.ListUserPage}`, "./page/ListUser.tsx"),
  ])
] satisfies RouteConfig;
