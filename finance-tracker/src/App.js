import React, { useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate login state (replace with Firebase logic later)
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <div>
          <Auth />
          <button onClick={handleLogin}>Simulate Login</button>
        </div>
      )}
    </div>
  );
}

export default App;

