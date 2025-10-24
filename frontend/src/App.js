import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import RemindersPage from "./pages/RemindersPage";
import Dashboard from "./pages/Dashboard";
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

  if (loading)
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;

  return (
    <Router>
      <nav className="bg-white shadow-sm text-gray-800 p-4 flex justify-center gap-6 font-medium">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-sky-600 transition">
              Dashboard
            </Link>
            <Link to="/reminders" className="hover:text-sky-600 transition">
              Reminders
            </Link>
          </>
        ) : (
          <Link to="/auth" className="hover:text-sky-600 transition">
            Login / Sign Up
          </Link>
        )}
      </nav>

      <Routes>
        {/* Auth route */}
        <Route path="/auth" element={!user ? <AuthCard /> : <Navigate to="/dashboard" />} />

        {/* Private routes */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/reminders" element={user ? <RemindersPage /> : <Navigate to="/auth" />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
      </Routes>
    </Router>
  );
}

export default App;
