import CampaignCardManager from "../component/CampaignCardManager"
import { authorize, UserClaimTypes, type AuthorizationModel, type UserClaims } from "../model/authorization-model"

const authorization: AuthorizationModel = {
  claims: [
    {
      type: UserClaimTypes.role,
      value: "SUPERADMIN"
    }
  ]
}

export async function clientLoader() {
  return authorize(authorization)
}

export default function SuperAdminPage() {
  return (
    <>
      <h2>Super Admin </h2>
      Add User Management and Role Management here!!
    </>
  )
}
