import { useEffect } from "react";
import type { Route } from "./+types/home";
import "highlight.js/styles/tokyo-night-dark.css"
import hljs from "highlight.js";
import ExpandaleCode from "component/ExpandableCode";
import fs from "fs/promises"
import path from "path"
import { getDirname } from "utility/getDirname";

const __dirname = getDirname(import.meta.url)

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  let fileData = ""
  try {
    const dir = path.join(__dirname, "./home.tsx")
    fileData = await fs.readFile(dir, { encoding: "utf8" })
  } catch (error) {
    console.log(error)
  }
  return {
    data: fileData
  }
}

export default function Home({
  loaderData
}: Route.ComponentProps) {

  const {
    data
  } = loaderData

  useEffect(() => {
    hljs.highlightAll()
  }, [data])
  return (
    <>
      <h1>Home</h1>

      <ExpandaleCode
        code={data}
      />
    </>
  )
}
