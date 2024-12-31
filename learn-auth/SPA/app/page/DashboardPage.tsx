import { AppRoutes } from "../routes"
import { useNavigate } from "react-router"
import './DashboardPage.css'
import type { Route } from "./+types/DashboardPage";
import { UserClaimTypes, whoami } from "../model/authorization-model";
import { roleButtons, type RoleButtonKeys } from "../model/role-button-model";
import { UserManagerService } from "../api/generated";
import { defaultClient } from "../api/constant";

export async function clientLoader() {
  return await whoami()
}

export default function DashboardPage({
  loaderData
}: Route.ComponentProps) {

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await UserManagerService.getUserManagerSignOut({ client: defaultClient })
    navigate("/")
  }

  const emails = loaderData.filter((claim) => claim.type === UserClaimTypes.email).map((role) => role.value as string)
  const roles = loaderData.filter((claim) => claim.type === UserClaimTypes.role).map((role) => role.value)

  const renderButton = (role: RoleButtonKeys) => (
    <>
      {roleButtons[role].map((item, index) => (
        <li
          key={`key-${index}`}
        >
          <button
            onClick={() => navigate(item.path)}
          >
            {item.displayName}
          </button>
        </li>
      ))}
    </>
  )
  const renderRoleButtons = () => (
    <>
      Accessible Route:
      <ul>
        {roles.map((item) => renderButton(item))}
      </ul>
    </>
  )

  return (
    <>
      <h1>📣 Campaign Manager</h1>
      <sub>ASPNET Core Identity Basic POC</sub>

      <hr />

      {loaderData.length > 0 ? (
        <>
          <sub>
            📧 {emails.map((email) => `${email}, `)}
            ♟️ {roles.map((role) => `${role}, `)}
          </sub>
          <h5
            style={{ marginTop: 0 }}
          >
            Welcome {" "}
            {loaderData.find((claim) => claim.type === UserClaimTypes.name)?.value}
          </h5>
          {renderRoleButtons()}
        </>
      )
        : (
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
        )
      }

      <hr />

      {loaderData.length > 0 && (
        <button
          onClick={() => handleSignOut()}
        >
          Sign Out
        </button>
      )}

    </>
  )
}
