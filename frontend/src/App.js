import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import RemindersPage from "./pages/RemindersPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-center gap-6">
        {!user && (
          <>
            <Link to="/signup" className="hover:text-indigo-400 transition">
              Signup
            </Link>
            <Link to="/login" className="hover:text-indigo-400 transition">
              Login
            </Link>
          </>
        )}
        {user && (
          <Link to="/reminders" className="hover:text-indigo-400 transition">
            Reminders
          </Link>
        )}
      </nav>

      <Routes>
        {!user ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="*" element={<Navigate to="/reminders" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
