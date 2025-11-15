import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSignup(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Signup functionality is not implemented yet.");
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
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <form className="space-y-5" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pr-28 px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none text-sm sm:text-base"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-white/6 hover:bg-white/8 text-xs sm:text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 transition font-medium shadow-lg flex justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                        ) : (
                            "Sign Up"
                        )}
                    </motion.button>

                    <div className="flex gap-3 flex-col">
                        <Link href="/" className="w-full">
                            <button className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 transition font-medium shadow-lg">
                                Go to home
                            </button>
                        </Link>

                        <Link href="/login" className="w-full">
                            <button className="w-full py-2.5 rounded-xl bg-white/6 hover:bg-white/10 transition font-medium shadow-lg">
                                Login
                            </button>
                        </Link>
                        <p className="text-center text-sm text-gray-300 mt-4">
                            By continuing you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>.
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
