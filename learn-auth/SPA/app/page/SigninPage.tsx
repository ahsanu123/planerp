import { useFetcher } from "react-router";
import type { Route } from "../+types/root";
import { simpleFormGenerator } from "../component/SimpleFormGenerator";
import "./SigninPage.css"
import { AccountService, AuthorizedTestService, UserManagerService } from "../api/generated";
import { BASE_URL, defaultClient, externalAuthenticationGoogleProviderUrl } from "../api/constant";
import { createClient } from "@hey-api/client-fetch";

export async function clientAction({
  params,
  request
}: Route.ActionArgs) {
  // const formData = await request.formData()
  // formData.forEach((item, key) => console.log(`key: ${key}, value: ${item}`))
  // console.log("form data: ", formData)
  // console.log("params: ", params)

  const res = await AuthorizedTestService.getAuthorizedTestBakerInfo({ method: 'GET' });
  console.log("response: ", res)
  console.log(res.response.status)
  const data = await res.response.json()

}

const signinModel = {
  email: "",
}

export default function SignupPage() {

  const fetcher = useFetcher()

  const handleGmailLogin = async () => {
    window.location.href = externalAuthenticationGoogleProviderUrl
  }

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
      <button
        onClick={() => handleGmailLogin()}
      >
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
