import React from "react"

export const DashboardPage: React.FC = () => {

  // const listRouteButton: JSX.Element[] = []
  // for (const route in Routes) {
  //   listRouteButton.push((
  //     <li>
  //       <Link
  //         to={`/${Routes[route]}`}
  //       >
  //         {route.replace("-", " ")}
  //       </Link>
  //     </li>
  //   ))
  // }
  //

  return (
    <>
      <h2>Dashboard Page</h2>
      <p>ASP.NET Core Identity</p>

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
          // listRouteButton.map((ButtonRoute) => ButtonRoute)
        }
      </ul>
    </>
  )
}
