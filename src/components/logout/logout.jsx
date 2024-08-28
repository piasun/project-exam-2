import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';

const LogoutButton = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate("/login");
      }

  return (
    <div>
      <button className="btn btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
