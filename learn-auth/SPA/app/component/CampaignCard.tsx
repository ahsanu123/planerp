import { Link, Navigate, useNavigate } from "react-router"
import "./CampaignCard.css"

export default function CampaignCard() {
  const campaignDescription = "if user already signin, remove those signup/signin button and display what user can access here"
  return (
    <div
      className="campaign-card"
    >
      <h4> 🌏  Asia Campaign Card</h4>
      <sub>
        Short Description 🌎 🌏 🌍
      </sub>

      <hr />

      <textarea
        onChange={() => undefined}
        id="textarea"
        rows={8}
        value={campaignDescription}
      />

      <button>
        Save
      </button>

    </div>
  )
}
