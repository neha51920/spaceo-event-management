import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields required");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/events";
    } catch (err) {
      alert("Login failed");
    }
  };
  const handleSignup = () => {
    navigate('/signup'); // Navigate to the signup page using navigate
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button><br /><br />
      <button onClick={handleSignup}>Don't have an account? Sign up</button>
    </form>
  );
};

export default Login;
