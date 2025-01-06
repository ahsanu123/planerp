import Clock from "../component/Clock"
import Calendar from "../component/Calendar"
import ListUser from "../component/ListUser"
import { useState } from "react"
import UserBillInformation from "../component/UserBillInformation"
import { AmpasPricingService, LocalAccountService, type AmpasDailySummary, type AmpasModel } from "../api/generated"
import { defaultClient } from "../api/constant"
import type { Route } from "./+types/AMSAdminPage"

/*
 * Basic AMS admin flow 
 *
 * admin able to look every user ampas summary each week or month, 
 * there a display for total ampas and total bill for each selected user.
 * there is print button to print bill.
 *
 * */

export async function clientLoader() {
  const users = await LocalAccountService.getLocalAccountListUser({
    client: defaultClient
  })

  return {
    users: users.data as string[]
  }
}

export default function AMSAdminPage({
  loaderData
}: Route.ComponentProps) {

  const {
    users
  } = loaderData

  const [selectedUser, setSelectedUser] = useState<string>()
  const [monthlyInformation, setMontlyInformation] = useState<AmpasModel[]>([]);

  const getMontlyUserInformation = async (username: string) => {

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

  const adminGridElement = (date: string) => {
    const includeDash = date.includes("-")
    return (
      <div
        className={`component ${includeDash ? "stripe" : ""}`}
      >
        {!includeDash
          ? (
            <>
              <p>
                {selectedUser}
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
  return (
    <>
      <h2>AMS Admin Page</h2>
      <Clock />

      <hr />
      <UserBillInformation />
      <hr />

      <Calendar
        title={selectedUser}
        gridComponent={adminGridElement}
      />
      <ListUser
        users={users}
        handleOnUserSelected={(username) => getMontlyUserInformation(username)}
      />
    </>
  )
}
