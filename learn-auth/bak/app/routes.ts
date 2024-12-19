import { route, type RouteConfig } from "@react-router/dev/routes";

export enum AppRoutes {
  PagePrefix = "page/",

  ClaimPage = "claim-page",
  RolePage = "role-page",
  SigninPage = "signin-page",
  SignupPage = "signup-page",
}

export default [
  route(`${AppRoutes.PagePrefix}${AppRoutes.ClaimPage}`, "./page/ClaimPage.tsx"),
  route(`${AppRoutes.PagePrefix}${AppRoutes.RolePage}`, "./page/RolePage.tsx"),
  route(`${AppRoutes.PagePrefix}${AppRoutes.SignupPage}`, "./page/SignupPage.tsx"),
  route(`${AppRoutes.PagePrefix}${AppRoutes.SigninPage}`, "./page/SigninPage.tsx"),
] satisfies RouteConfig;
