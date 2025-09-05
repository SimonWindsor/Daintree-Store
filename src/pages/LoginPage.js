import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';

import './LoginPage.css';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleLoading, setUser } = props;

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      handleLoading(true);
      const user = await login(email, password);
      setUser(user);
      navigate('/');
    } catch(error) {
      console.error(`Unable to login: ${error}`);
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
    </div>
  )
}

export default LoginPage;