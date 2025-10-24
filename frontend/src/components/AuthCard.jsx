import React, { useState } from "react";
import { Mail, Lock, User, Calendar, HeartPulse } from "lucide-react";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  // Placeholder form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isLogin ? "Login" : "Sign Up"} submitted!`);
  };

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Brand */}
        <div className="flex items-center justify-center mb-6">
          <HeartPulse className="text-green-500 w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold text-green-600 tracking-tight">
            MediNow
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sky-500">
                  <User className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent outline-none text-gray-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Age</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sky-500">
                  <Calendar className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Your age"
                    className="w-full bg-transparent outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sky-500">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sky-500">
              <Lock className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sky-500">
                <Lock className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full bg-transparent outline-none text-gray-700"
                  required
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-sky-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg font-medium hover:bg-sky-700 transition-transform transform hover:scale-[1.02]"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button className="w-full border border-gray-300 text-sky-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-sky-600 font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
