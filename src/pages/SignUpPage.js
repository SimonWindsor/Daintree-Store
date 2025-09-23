import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api.js';

import './SignUpPage.css';

function SignUpPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { handleLoading, setUser } = props;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      handleLoading(true);
      const response = await signup({ email, password });
      
      if(!response || !response.success) {
        setMessage(response?.message || 'Signup failed. Please try again later.');
        return;
      }

      setUser(response.user);
      navigate('/');
    } catch(error) {
      console.error(`Unable to signup: ${error}`);
      setMessage('Signup failed. Please try again later.');
    } finally {
      handleLoading(false);
    }
  }

  return (
    <div className="SignUpPage">
      <form className="sign-up-form" onSubmit={handleSignup}>
        <input
          className="sign-up-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="sign-up-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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