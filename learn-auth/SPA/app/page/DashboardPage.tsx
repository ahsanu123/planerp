import { useNavigate } from "react-router"
import type { Route } from "./+types/DashboardPage";
import { UserClaimTypes, whoami } from "../model/authorization-model";
import { roleButtons, type RoleButtonKeys } from "../model/role-button-model";
import { AmpasDailyService, AmpasPricingService, LocalAccountService, UserManagerService, type AmpasModel } from "../api/generated";
import { defaultClient } from "../api/constant";
import './DashboardPage.css'
import GridButton from "../component/GridButton";
import Calendar from "../component/Calendar";
import Clock from "../component/Clock";
import VirtualKeyboard from "../component/VirtualKeyboard";
import { useEffect, useState } from "react";
import ListUser from "../component/ListUser";
import { utilToDate } from "../utility/convert-heyapi-date";
import { formatAsRupiah } from "../utility/format-as-rupiah";

export async function clientLoader() {
  // return await whoami()
  const users = await LocalAccountService.getLocalAccountListUser({
    client: defaultClient
  })

  return {
    users: users.data as string[]
  }
}

type DisplayStateType = "InputNumber" | "Date"

export default function DashboardPage({
  loaderData
}: Route.ComponentProps) {

  const { users } = loaderData
  const [display, setDisplay] = useState<DisplayStateType>("Date")
  const [monthlyBill, setMonthlybill] = useState<number>()
  const [totalTaken, setTotalTaken] = useState<number>()
  const [selectedUser, setSelectedUser] = useState<string>()
  const [monthlyInformation, setMontlyInformation] = useState<AmpasModel[]>([]);

  const navigate = useNavigate();

  const handleOnVirtualKeyBoardOk = async (amount: number) => {
    await AmpasDailyService.getAmpasDailyAddAmpas({
      client: defaultClient,
      query: {
        amount
      }
    })
    setDisplay("Date")
    await getMonthlyBillForUser()
  }

  const handleOnUserSelected = async (username: string) => {
    await getMontlyUserInformation(username)
    setDisplay("InputNumber")
  }

  const getMonthlyBillForUser = async () => {
    const monthlyBill = await AmpasPricingService.postAmpasPricingMonthlyBill({
      client: defaultClient,
      body: new Date()
    })
    await getMontlyUserInformation(selectedUser ?? "")

    const totalTaken = monthlyInformation?.filter((item) => {
      const takenTime = utilToDate(item.takenTime!)
      return takenTime.getDate() === new Date().getDate()
    })
      .map((item) => item.amount)
      .reduce((a, b) => ((a ?? 0) + (b ?? 0)), 0)

    setMonthlybill(monthlyBill.data as number)
    setTotalTaken(totalTaken)
  }

  const handleSignOut = async () => {
    await UserManagerService.getUserManagerSignOut({ client: defaultClient })
  }

  const getMontlyUserInformation = async (username: string) => {

    if (!username) return
    await LocalAccountService.getLocalAccountLogout({ client: defaultClient })
    await LocalAccountService.postLocalAccountLoginWithoutPassword({
      client: defaultClient,
      query: { username }
    })
    setSelectedUser(username)
    const monthlyInformation = await AmpasPricingService.postAmpasPricingMonthlyInformation({
      client: defaultClient,
      body: new Date()
    })

    setMontlyInformation(monthlyInformation.data as AmpasModel[]);
  }

  // const emails = loaderData.filter((claim) => claim.type === UserClaimTypes.email).map((role) => role.value as string)
  // const roles = loaderData.filter((claim) => claim.type === UserClaimTypes.role).map((role) => role.value)

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
        {/* {roles.map((item) => renderButton(item))} */}
      </ul>
    </>
  )

  const refreshPage = () => {
    window.location.reload()
  }

  const renderTakenByUserForThisDay = (date: string) => (
    // make it simpler
    monthlyInformation?.filter((item) => {
      const takenTime = utilToDate(item.takenTime!)
      // console.log(takenTime.getDate())
      return takenTime.getDate() === parseInt(date)
    })
      .map((item) => item.amount)
      .reduce((a, b) => ((a ?? 0) + (b ?? 0)), 0)
  )

  const gridElement = (date: string) => {
    const includeDash = date.includes("-")
    return (
      <div
        className={`component ${includeDash ? "stripe" : ""}`}
      >
        {!includeDash
          ? (
            <>
              <p>
                {!selectedUser ?
                  ("Pilih User")
                  :
                  (`Ambil ${renderTakenByUserForThisDay(date)}`)
                }
              </p>

            </>
          )
          : (
            <p>
              🚧
            </p>
          )}
        <sub>
          <b>
            {date}
          </b>
        </sub>
      </div>
    )
  }

  useEffect(() => {
    getMonthlyBillForUser()
  }, [selectedUser])

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
        {monthlyBill && (
          <sub> 💸 Sejumlah:
            {" "}
            <b>
              {formatAsRupiah(monthlyBill)}
            </b>
          </sub>
        )}
        <h2>
          {selectedUser ?? "User"}
          -
          {totalTaken}
        </h2>
        <hr />

        {
          (display === "Date")
            ? (
              <>
                <Calendar
                  title={selectedUser}
                  showNavigator={false}
                  gridComponent={gridElement}
                  onNextMonthClicked={(date) => getMontlyUserInformation(selectedUser ?? "")}
                  onPrevMonthClicked={(date) => getMontlyUserInformation(selectedUser ?? "")}
                />
                <ListUser
                  users={users}
                  handleOnUserSelected={handleOnUserSelected}
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
