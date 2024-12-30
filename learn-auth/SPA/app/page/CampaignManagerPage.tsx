import CampaignCardManager from "../component/CampaignCardManager"
import { authorize, UserClaimTypes, type AuthorizationModel, type UserClaims } from "../model/authorization-model"

const authorization: AuthorizationModel = {
  claims: [
    {
      type: UserClaimTypes.role,
      value: "GENERALADMIN"
    }
  ]
}

export async function clientLoader() {
  return authorize(authorization)
}

export default function CampaignManagerPage() {
  return (
    <>
      <h2>Campaign Manager</h2>
      page to edit campaign
      <CampaignCardManager />
    </>
  )
}
