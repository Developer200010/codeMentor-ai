import React from "react";
import Link from "next/link";
export default function Navbar(){
return (
<nav className="w-full fixed top-0 left-0 z-20 backdrop-blur-md bg-white/5 border-b border-white/10">
<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
{/* Logo */}
<Link href="/" className="text-xl font-bold tracking-tight">
<img src="/logo2.svg" alt="CodeMentor" className="text-transparent bg-clip-text " width={80} height={50} />
</Link>


{/* Buttons */}
<div className="flex items-center gap-4">
<Link
href="/login"
className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition text-sm"
>
Login
</Link>
<Link
href="/signup"
className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 transition text-sm font-medium shadow-lg"
>
Sign Up
</Link>
</div>
</div>
</nav>
);
};