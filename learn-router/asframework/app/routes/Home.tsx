import { useEffect } from "react";
import type { Route } from "./+types/Home";
import "highlight.js/styles/tokyo-night-dark.css"
import hljs from "highlight.js";
import ExpandableCode from "component/ExpandableCode";
import fs from "fs/promises"
import path from "path"
import { getDirname } from "utility/getDirname";
import Hero from "component/Hero";
import { createConn } from "repository";

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
    const dir = path.join(__dirname, "./Home.tsx")
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
    createConn()
  }, [data])

  return (
    <>
      <h1>Home</h1>
    </>
  )
}
