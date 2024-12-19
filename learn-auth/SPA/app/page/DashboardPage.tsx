import { AppRoutes } from "../routes"
import type { JSX } from "react"
import { Link } from "react-router"

const listRouteButton: JSX.Element[] = []
let index = 0;
for (const route in AppRoutes) {
  if (route === 'PagePrefix') continue

  listRouteButton.push((
    <li
      key={index}
    >
      <Link
        to={`${AppRoutes.PagePrefix}${AppRoutes[route]}`}
      >
        {route}
      </Link>
    </li>
  ))
  index++
}
export default function DashboardPage() {
  return (
    <>
      <h1>Home ASPNET Core Identity</h1>
      <p>aspnet core identity basic POC</p>

      <p>
        <button>
          Authorized Endpoint
        </button>
      </p>

      <p>
        <button>
          Anonymous Endpoint
        </button>
      </p>

      <ul>
        {
          listRouteButton.map((ButtonRoute) => ButtonRoute)
        }
      </ul>
      <hr />
    </>
  )
}
