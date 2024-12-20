import CampaignCard from "./CampaignCard"
import "./CampaignCardManager.css"

export default function CampaignCardManager() {
  return (
    <div
      className="campaign-card-manager"
    >
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  )
}
