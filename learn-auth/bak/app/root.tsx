import React from "react"
import { Outlet } from "react-router-dom"
import 'sakura.css'

export default function Root() {
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
      <Outlet />
    </>
  )
}
