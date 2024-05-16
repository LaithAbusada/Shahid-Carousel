import React, { useState } from "react";
import "./Login.css"; // Import CSS file for styling
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    // Validate email using regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error(
        "Invalid email. Please enter a valid email address in the format example@example.com."
      );

      return;
    }

    // Mock authentication (replace with actual authentication logic)
    if (email === "example@example.com" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ email }));
      setIsLoggedIn(true);
      toast.success("Succesfully Logged In");
      navigate("/");
    } else {
      toast.error("Your password is incorrect or this account doesn't exist");
    }
  };

  return (
    <>
      <Helmet>
        <title>Shahid Login</title>
        <meta
          name="description"
          content="Welcome To Shahid, Please login to start watching all your favourite shows"
        />
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="login-container">
        {isLoggedIn ? (
          <span />
        ) : (
          <div className="login-form">
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
              <span>Login</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
