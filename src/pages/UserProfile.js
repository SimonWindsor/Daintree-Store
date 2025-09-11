import './UserProfile.css';

function UserProfile(props) {
  const { user } = props;

  return (
    <div className="UserProfile">
      <h2>Welcome {user.first_name}</h2>
    </div>
  )
}

export default UserProfile;