import { NavLink, Outlet, Route } from "react-router";
import "./DefaultLayout.css"
import { Routes } from "~/routes";

export default function DefaultLayout() {

  const pages: string[] = [
    Routes.SuperMarket,
    Routes.Store,
    Routes.Harbour,
    Routes.Warehouse
  ]

  return (
    <div
      className="default-layout"
    >
      <div
        className="sidebar"
      >
        <h4>
          🐟 Fishi
        </h4>
        <ul>
          {pages.map((page, index) => (
            <li
              key={`li-${page}-${index}`}
            >
              <NavLink
                className={(prop) => (
                  `navlink ${prop.isActive ? "navlink-active" : ""}`
                )}
                key={`${page}-${index}`}
                to={page}
              >
                {(prop) => (
                  <>
                    {prop.isActive ? "💠" : ""}
                    {page}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
