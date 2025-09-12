import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';

import './LoginPage.css';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { handleLoading, setUser } = props;

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Attempting login with', email, password);
    try {
      handleLoading(true);
      const response = await login(email, password);
      
      if(!response.success) {
        setMessage(response.message);
        return;
      }

      setUser(response.user);
      navigate('/');
    } catch(error) {
      console.error(`Unable to login: ${error}`);
      setMessage('Login failed. Please try again later.');
    } finally {
      handleLoading(false);
    }
  }

  return (
    <div className="LoginPage">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login-submit" type="submit">Login</button>
      </form>
      <div className="login-message" id="loginMessage">{message}</div>
      <div className="sign-up">New User? <Link to="/signup">Sign up</Link></div> 
    </div>
  )
}

export default LoginPage;