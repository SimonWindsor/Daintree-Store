import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api.js';
import { validateSignUp} from '../services/validation.js';
import { FunctionContext } from '../App.js';
import './SignUpPage.css';

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { handleLoading, setUser } = useContext(FunctionContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      handleLoading(true);

      const errors = validateSignUp({ firstName, lastName, phoneNumber, email, password, repeatPassword });
      if (Object.keys(errors).length > 0) {
        setMessage(Object.values(errors).join('\n'));
        return;
      }

      const response = await signup({ email, firstName, lastName, phoneNumber, password });
      
      if(!response || !response.success) {
        setMessage(response?.message || 'Signup failed. Please try again later.');
        return;
      }

      setUser(response.user);
      navigate('/');
    } catch(error) {
      console.error(`Unable to signup: ${error}`);
      setMessage(`Signup failed. Please try again later.
        ${error}`);
    } finally {
      handleLoading(false);
    }
  }

  return (
    <div className="SignUpPage">
      <form className="sign-up-form" onSubmit={handleSignup}>
        <input
          className="first-name"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          className="last-name"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          className="phone-number"
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />
        <input
          className="sign-up-email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="sign-up-password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          className="repeat-password"
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
          required
        />
        <button className="sign-up-submit" type="submit">Sign Up</button>
      </form>
      <div className="signup-message" id="signupMessage">{message}</div>
      <div className="login-link">Already have an account? <Link to="/login">Log in</Link></div>
    </div>
  )
}

export default SignUpPage;