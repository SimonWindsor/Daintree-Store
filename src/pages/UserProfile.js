import { useContext } from 'react';
import { FunctionContext } from '../App';
import './UserProfile.css';

function UserProfile() {
  const { user } = useContext(FunctionContext);

  return (
    <div className="UserProfile">
      <h2>Welcome {user.first_name}</h2>
    </div>
  )
}

export default UserProfile;