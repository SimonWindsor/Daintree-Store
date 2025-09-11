import './SignUpPage.css';

function SignUpPage() {
  return (
    <div className="SignUpPage">
      <form className="sign-up-form">
        <input
          className="sign-up-email"
          type="email"
          placeholder="Email"
        />
        <input
          className="sign-up-password"
          type="password"
          placeholder="Password"
        />
        <button className="sign-up-submit" type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage;