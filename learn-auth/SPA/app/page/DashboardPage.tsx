import { AppRoutes } from "../routes"
import { Link, Navigate, useNavigate } from "react-router"
import './DashboardPage.css'
import CampaignCardManager from "../component/CampaignCardManager";

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>📣 Campaign Manager</h1>
      <p>ASPNET Core Identity Basic POC</p>

      <div
        className="login-container"
      >
        <button
          onClick={() => navigate(`${AppRoutes.PagePrefix}${AppRoutes.SigninPage}`)}
        >
          Signin
        </button>

        <button
          onClick={() => navigate(`${AppRoutes.PagePrefix}${AppRoutes.SignupPage}`)}
        >
          Signup
        </button>
      </div>
      <hr />

      <p>
        if user already signin, remove those signup/signin button with signout button and display what user can access below
      </p>

      <CampaignCardManager />
    </>
  )
}
