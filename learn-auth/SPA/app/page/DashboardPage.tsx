import { useNavigate } from "react-router"
import type { Route } from "./+types/DashboardPage";
import { UserClaimTypes, whoami } from "../model/authorization-model";
import { roleButtons, type RoleButtonKeys } from "../model/role-button-model";
import { UserManagerService } from "../api/generated";
import { defaultClient } from "../api/constant";
import './DashboardPage.css'
import GridButton from "../component/GridButton";
import Calendar from "../component/Calendar";
import Clock from "../component/Clock";
import VirtualKeyboard from "../component/VirtualKeyboard";
import { useState } from "react";

export async function clientLoader() {
  return await whoami()
}

type DisplayStateType = "InputNumber" | "Date"

export default function DashboardPage({
  loaderData
}: Route.ComponentProps) {

  const [display, setDisplay] = useState<DisplayStateType>("Date")

  const buttons: string[] = []
  for (let i = 0; i < 6; i++) {
    buttons.push(`User ${i + 1}`)
  }
  const navigate = useNavigate();

  const handleOnVirtualKeyBoardOk = (amount: number) => {
    console.log(amount)
    setDisplay("Date")
  }

  const handleOnUserSelected = (username: string) => {
    console.log(username)
    setDisplay("InputNumber")
  }

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
          key={`dasboard-li-key-${index}`}
        >
          <button
            key={`dasboard-btn-${index}`}
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

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <div
      className="dashboard-page"
    >
      <header>

        <div>
          <h1> 💾 AMS</h1>
          <sub>Ampas Management System</sub>
        </div>

        <div>
          <Clock />
          <button
            onClick={() => refreshPage()}
            style={{
              border: "0px",
              backgroundColor: "transparent",
              top: "10px",
              float: "right"
            }}
          >
            ⚡
          </button>
        </div>

      </header>
      <hr />

      <main>
        <sub> 💸 sejumlah: Rp.1,2500,000</sub>
        <h2>Tukijo - Total 99 Ampas</h2>
        <hr />

        {
          (display === "Date")
            ? (
              <>
                <Calendar />
                <GridButton
                  buttons={buttons}
                  onClick={handleOnUserSelected}
                />
              </>
            )
            : (
              <VirtualKeyboard
                title="Masukan Jumlah Ampas"
                description="Tekan Jumlah Pada Keyboard Lalu Klik OK"
                onOk={handleOnVirtualKeyBoardOk}
              />
            )
        }
      </main>

    </div>
  )
}
