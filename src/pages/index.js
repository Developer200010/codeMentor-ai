import React from "react";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";
import { Navbar } from "@/pages/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white flex items-center">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#061021" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
          </svg>
        </div>

        <main className="w-full max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-4">
                  <span className="px-2 py-1 bg-emerald-900/20 rounded">Beta</span>
                  New — AI code feedback
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  CodeMentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400">AI</span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="mt-6 text-gray-300 max-w-2xl"
                >
                  Analyze snippets, get concise feedback, and refactor faster — a minimal, focused JS MVP built for clarity
                  and developer flow.
                </motion.p>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/editor"
                      className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg transition"
                      aria-label="Open Code Editor"
                    >
                      Open Editor
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
                <div className="mt-6 text-xs text-gray-500">
                  <span>Made for developers • Minimal, privacy-focused • No vendor lock-in</span>
                </div>
              </motion.div>

              {/* Feature list */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Instant Feedback", desc: "Understand problems and fixes in plain English." },
                  { title: "Smart Refactors", desc: "Suggestions that preserve intent and patterns." },
                  { title: "Lightweight", desc: "No heavy onboarding — drop in your code." },
                  { title: "Privacy-first", desc: "Your code never leaves the session unless you opt in." },
                ].map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/3 border border-white/6"
                  >
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-gray-300">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Right: Interactive card / code preview */}
            <aside>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl bg-gradient-to-br from-white/3 to-white/6 border border-white/8 p-6 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-emerald-300 font-medium">Live preview</div>
                    <div className="mt-2 text-sm text-gray-200">Paste a snippet in the editor to see focused suggestions.</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      aria-label="Copy example"
                      className="px-3 py-1 rounded-md text-xs bg-white/5 border border-white/10"
                    >
                      Copy
                    </button>

                    <button aria-label="Run" className="px-3 py-1 rounded-md text-xs bg-emerald-700/30">
                      Run
                    </button>
                  </div>
                </div>

                <div className="mt-6 bg-black/70 rounded-lg overflow-hidden border border-white/6">
                  <pre className="p-4 text-xs sm:text-sm font-mono text-green-200 max-h-56 overflow-auto">
                    {`function greet(name) {
  // Minimal example
  return 'Hello, ' + name;
}

console.log(greet('World'));
`}
                  </pre>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-400">ESLint: OK • Complexity: low</div>
                  <div className="text-xs text-gray-400">Response: <span className="text-emerald-300">Suggest rename to template literal</span></div>
                </div>
              </motion.div>

              <div className="mt-6 text-sm text-gray-400">
                <strong>Pro tip:</strong> Use the editor shortcuts <span className="px-2 py-0.5 bg-white/5 rounded">Ctrl+S</span> to
                quickly get feedback.
              </div>
            </aside>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center text-sm text-gray-500"
          >
            © {new Date().getFullYear()} CodeMentor Labs — Built with ❤️ for developers
          </motion.footer>
        </main>
      </div>
    </>
  );
}
