import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../hooks/auth';

const LogoutButton = () => {
    const { logout } = useAuthContext(); 
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
