import React from 'react';
import './UserComponent.css';

interface UserProps {
  username: string;
  password: string;
  email: string;
  address: string;
  avatar: string;
}

const UserComponent: React.FC<UserProps> = ({ username, password, email, address, avatar }) => {
  return (
    <div className="user-container">
      <div className="user-avatar">
        <img src={avatar} alt="Avatar" />
      </div>
      <div className="user-details">
      <p><strong>Username:</strong> {username}</p>
        <p><strong>Password:</strong> {password}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>
    </div>
  );
}

export default UserComponent;
