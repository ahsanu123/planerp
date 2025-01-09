import { generateEmojiFavicon } from "utility";
import type { Route } from "./+types/Home";
import "highlight.js/styles/tokyo-night-dark.css"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: " Warehouse" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export const links: Route.LinksFunction = () => [
  generateEmojiFavicon("🐟"),
]

export default function Warehouse({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <h1>warehouse</h1>
    </>
  )
}
