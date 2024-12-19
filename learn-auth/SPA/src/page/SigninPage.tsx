export const SigninPage: React.FC = () => {
  return (
    <>
      <h2>Sign In Page</h2>
      <form>
        <label
          htmlFor="input-email"
        >
          Email
        </label>

        <input
          id="input-email"
          type="email"
        />

        <label
          htmlFor="input-password"
        >
          Password
        </label>

        <input
          id="input-password"
          type="password"
        />

        <p>
          <button>
            Submit
          </button>
        </p>

      </form>
    </>
  )
}
