import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase authentication

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      } else {
        // Signup logic
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Auth;
