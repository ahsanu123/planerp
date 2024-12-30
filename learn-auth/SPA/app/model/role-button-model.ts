import { AppRoutes } from "../routes"

export type RoleButtonKeys =
  "SUPERADMIN"
  | "GENERALADMIN"
  | "EUROPEADMIN"
  | "ASIAADMIN"
  | "AMERICANADMIN"

type RoleButtonRoute = {
  path: string,
  displayName: string,
}

type RoleButtonType = Record<RoleButtonKeys, Array<RoleButtonRoute>>


export const roleButtons: RoleButtonType = {
  SUPERADMIN: [{
    displayName: "Super Admin Secret Page",
    path: `/${AppRoutes.PagePrefix}${AppRoutes.SuperAdminPage}`
  }],
  GENERALADMIN: [{
    displayName: "Campaign Manager Page",
    path: `/${AppRoutes.PagePrefix}${AppRoutes.CampaignManagerPage}`
  }],
  EUROPEADMIN: [],
  ASIAADMIN: [],
  AMERICANADMIN: []
}
