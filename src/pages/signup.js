import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Signup() {
    function handleSignup(){
        alert("Signup functionality is not implemented yet.")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>


                <form className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:border-rose-500 outline-none"
                        />
                    </div>


                    <motion.button
                    onClick={handleSignup}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 transition font-medium shadow-lg"
                    >
                        Sign Up
                    </motion.button>
                    <Link href={"/"}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition font-medium shadow-lg"
                        >
                            Go to home
                        </motion.button>
                    </Link>
                </form>


                <p className="text-center text-sm text-gray-300 mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-rose-400 hover:underline">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};