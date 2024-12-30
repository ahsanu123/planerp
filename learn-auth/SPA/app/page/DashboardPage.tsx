import { AppRoutes } from "../routes"
import { Link, Navigate, useNavigate } from "react-router"
import './DashboardPage.css'
import CampaignCardManager from "../component/CampaignCardManager";
import { AuthorizedTestService, RoleManagerService, UserManagerService } from "../api/generated";
import { BASE_URL, defaultClient } from "../api/constant";

export default function DashboardPage() {
  const navigate = useNavigate();
  const onBakerInfoClicked = async () => {
    const res = await AuthorizedTestService.getAuthorizedTestBakerInfo({
      client: defaultClient
    })

    console.log(res.data)
  }
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

      <button
        onClick={() => onBakerInfoClicked()}
      >
        Baker Info
      </button>

      <p>
        if user already signin, remove those signup/signin button with signout button and display what user can access below
      </p>

      <CampaignCardManager />
    </>
  )
}
