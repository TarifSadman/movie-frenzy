import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  // Function to generate a simple token
  const generateToken = () => {
    // Generate a random string
    const randomString = Math.random().toString(36).substr(2);
    return randomString;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !username) {
      setError("Please fill in all fields");
    } else {
      setError("");
  
      const token = generateToken();
      const userData = {
        username: username,
        email: email
      };
  
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", token);
  
      setTimeout(() => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        history.push("/");
      }, 10 * 60 * 1000);
  
      history.push("/movies");
    }
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUnameChange = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const timeoutId = setTimeout(() => {
        localStorage.removeItem("userData");
        localStorage.removeItem("favoriteMovies");
        localStorage.removeItem("token");
        history.push("/");
      }, 10 * 60 * 1000);
        return () => clearTimeout(timeoutId);
    }
  }, [history]);
  
  
  

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmEmail">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUnameChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
