import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in:", userCredential.user);
      alert("Login successful!");
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google login:", result.user);
      alert(`Welcome, ${result.user.displayName}!`);
    } catch (error) {
      console.error("❌ Google login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🩺 MediNow Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px" }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>

      <hr style={{ margin: "20px 0" }} />
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
