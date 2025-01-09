import { Outlet } from "react-router";

export function DefaultLayout() {
  return (
    <>
      <p>
        default layout
      </p>
      <Outlet />
    </>
  )
}
