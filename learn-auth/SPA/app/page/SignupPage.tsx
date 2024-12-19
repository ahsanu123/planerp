import { useFetcher } from "react-router";
import type { Route } from "../+types/root";

export async function clientAction({
  params,
  request
}: Route.ActionArgs) {
  const formData = await request.formData()
  formData.forEach((item, key) => console.log(`key: ${key}, value: ${item}`))
  console.log("form data: ", formData)
  console.log("params: ", params)
}
export default function SignupPage() {

  const fetcher = useFetcher()

  return (
    <>
      <h2>Signup Page</h2>

      <fetcher.Form
        method="POST"
      >
        <label
          htmlFor="input-username"
        >
          Username
        </label>
        <input
          id="input-username"
          name="username"
        />

        <p>
          <button
            type="submit"
          >
            Sign Up
          </button>
        </p>
      </fetcher.Form>

    </>
  )
}
