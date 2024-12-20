import { useFetcher } from "react-router";
import type { Route } from "../+types/root";
import { simpleFormGenerator } from "../component/SimpleFormGenerator";
import "./SigninPage.css"

export async function clientAction({
  params,
  request
}: Route.ActionArgs) {
  const formData = await request.formData()
  formData.forEach((item, key) => console.log(`key: ${key}, value: ${item}`))
  console.log("form data: ", formData)
  console.log("params: ", params)
}

const signinModel = {
  email: "",
}

export default function SignupPage() {

  const fetcher = useFetcher()

  const internalSignin = (
    <fetcher.Form
      method="POST"
    >
      {simpleFormGenerator(signinModel, {
        email: {
          type: "email"
        },
      })}


      <p>
        <button
          type="submit"
        >
          Sign In
        </button>
      </p>
    </fetcher.Form>
  )

  const externalSignin = (
    <>
      <p>
        or Signin With
      </p>
      <button>
        Gmail
      </button>

      <button>
        Github
      </button>

      <button>
        Microsoft
      </button>
    </>
  );

  return (
    <>
      <h2>🔏 Signin Page</h2>

      <div
        className="signin-container"
      >
        <div>
          {internalSignin}
        </div>

        <div
          className="external-signin"
        >
          {externalSignin}
        </div>
      </div>

    </>
  )
}
