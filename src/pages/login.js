import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Responsive LOGIN COMPONENT
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real auth logic
    setTimeout(() => {
      setLoading(false);
      alert("Login functionality is not implemented yet.");
    }, 700);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 rounded-2xl bg-white/6 backdrop-blur-md border border-white/8 shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-5">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleSubmit} aria-label="login form">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@domain.com"
              required
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none text-sm sm:text-base"
              aria-required="true"
              aria-label="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full pr-28 px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none text-sm sm:text-base"
                aria-required="true"
                aria-label="password"
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="px-3 py-1 rounded-lg bg-white/6 hover:bg-white/8 text-xs sm:text-sm"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 transition font-medium shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : (
              "Login"
            )}
          </motion.button>

          <div className="flex gap-3 flex-col">
            <Link href="/" legacyBehavior>
              <a className="w-full text-center py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition font-medium shadow-lg text-sm sm:text-base">Go to home</a>
            </Link>

            <Link href="/signup" legacyBehavior>
              <a className="w-full text-center py-2.5 rounded-xl bg-white/6 text-white hover:bg-white/8 transition font-medium shadow-lg text-sm sm:text-base">Sign Up</a>
            </Link>
          </div>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          By continuing you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>.
        </p>
      </motion.div>
    </div>
  );
}
