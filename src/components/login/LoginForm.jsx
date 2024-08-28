import React, { useState } from "react";
import { saveToken, saveUser } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../constants/apiUrl";
import fetchProfile from "../profiles/FetchProfile";
 
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("data response.json: ", data);
 
      if (response.ok) {
        saveToken(data.accessToken);
        const profileData = await fetchProfile(data.name, data.accessToken);
        saveUser(profileData);
        navigate("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };
 
  return (
    <div>
      <form onSubmit={handleSubmit} className="container mt-5">
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
</form>
      {error && <p>{error}</p>}
    </div>
  );
};
 
export default Login;