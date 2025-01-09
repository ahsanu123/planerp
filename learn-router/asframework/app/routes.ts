import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export enum Routes {

  SuperMarket = "super-market",
  Store = "store",
  Harbour = "harbour",
  Warehouse = "warehouse"
}

export default [
  layout("./layout/DefaultLayout.tsx", [
    index("routes/Home.tsx"),
    route(Routes.Warehouse, "./routes/Warehouse.tsx", { id: "home-warehouse" }),
    route(Routes.Harbour, "./routes/Warehouse.tsx", { id: "harbour" }),
    route(Routes.Store, "./routes/Warehouse.tsx", { id: "store" }),
    route(Routes.SuperMarket, "./routes/Warehouse.tsx", { id: "super-market" })
  ]),

  route("side", "./layout/SidebarLayout.tsx", [
    route("warehouse", "./routes/Warehouse.tsx"),
    route("warehouse/:id", "./routes/Warehouse.tsx", { id: "sta" })
  ])
] satisfies RouteConfig;
