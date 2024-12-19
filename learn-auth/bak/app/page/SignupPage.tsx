export const SignupPage: React.FC = () => {
  return (
    <>
      <h2>Signup Page</h2>

      <form>
        <label
          htmlFor="input-username"
        >
          Username
        </label>
        <input
          id="input-username"
        />

        <p>
          <button
            type="submit"
          >
            Sign Up
          </button>
        </p>
      </form>

    </>
  )
}
