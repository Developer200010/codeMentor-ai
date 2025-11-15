import { useEffect, useState } from "react";
import Head from "next/head";
import { FiSun, FiMoon, FiCopy, FiLoader, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_CODE = `function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}`;

export default function EditorPage() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  async function analyze() {
    setLoading(true);
    setError(null);
    setReview(null);
    try {
      const resp = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, filename: "snippet.js" })
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        setError(err.error || `Server returned ${resp.status}`);
        setLoading(false);
        return;
      }
      const data = await resp.json();
      setReview(data.review);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  const applyRefactor = () => {
    if (review?.refactor?.code) setCode(review.refactor.code);
  };

  const copyRefactor = async () => {
    const text = review?.refactor?.code || code;
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Framer-motion variants
  const container = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, when: "beforeChildren" }
    }
  };

  const card = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: 6, transition: { duration: 0.25 } }
  };

  return (
    <>
      <Head>
        <title>CodeMentor Demo — Editor</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-900bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white"
            : "min-h-screen bg-gray-50 text-gray-900"
        }
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 py-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div className="flex items-center gap-3" layout>
              <motion.div
                layout
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg text-white font-bold"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="/logo.svg" alt="CodeMentor" width={30} height={30} />
              </motion.div>
              <div>
                <h1 className="text-lg font-semibold mt-4">CodeMentor — Editor</h1>
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-4">Quick code review, refactor suggestions & issues</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-3 w-full sm:w-auto" layout>
              {/* Language select (styled) */}
              <div className="w-full sm:w-auto">
                <label htmlFor="language" className="sr-only">Select language</label>

                <div
                  className={
                    "relative inline-flex items-center rounded-lg px-3 py-1 border " +
                    (theme === "dark"
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-200")
                  }
                >
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={
                      "appearance-none bg-transparent pr-8 pl-1 text-sm leading-6 outline-none " +
                      (theme === "dark" ? "text-gray-600" : "text-gray-900")
                    }
                    aria-label="Select language"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                  </select>

                  {/* Chevron icon (absolute on the right) */}
                  <svg
                    className="pointer-events-none absolute right-2 w-4 h-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>


              <motion.button
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
                <span>{theme === "dark" ? "Light" : "Dark"}</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Column */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-2"
            layout
          >
            <motion.label className="text-sm text-gray-400" variants={card}>Filename</motion.label>
            <motion.input
              value={`snippet.${language === "python" ? "py" : language === "typescript" ? "ts" : "js"}`}
              readOnly
              className={theme === "dark"
                ? "w-full mt-2 mb-3 px-3 py-2 bg-gray-800 rounded-md text-sm text-gray-200 border border-gray-800"
                : "w-full mt-2 mb-3 px-3 py-2 bg-white rounded-md text-sm text-gray-800 border"
              }
              variants={card}
              layout
            />

            <motion.textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className={
                (theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900") +
                " w-full min-h-[56vh] rounded-lg shadow-md p-4 font-mono text-sm resize-none border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }
              variants={card}
              layout
            />

            <motion.div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4" variants={card} layout>
              <div className="flex gap-2 w-full sm:w-auto">
                <motion.button
                  onClick={() => { setCode(SAMPLE_CODE); setReview(null); }}
                  className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset
                </motion.button>
              </div>

              <motion.button
                onClick={analyze}
                disabled={loading}
                className="ml-0 sm:ml-2 inline-flex items-center justify-center text-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm"
                whileHover={loading ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiCheck />}
                <span>{loading ? "Analyzing..." : "Analyze"}</span>
              </motion.button>

              <div className="flex items-center gap-3 mt-2 sm:mt-0 ml-auto w-full sm:w-auto">
                <motion.div className="text-sm text-gray-400" variants={card} layout>{code.split("\n").length} lines</motion.div>
              </div>
            </motion.div>
          </motion.section>

          {/* Sidebar */}
          <motion.aside className="lg:col-span-1" layout>
            <motion.div
              variants={card}
              initial="hidden"
              animate="show"
              exit="exit"
              className={(theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900") + " rounded-lg shadow p-4 sticky top-6 border"}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Quick Summary</h3>
                  <p className="text-sm text-gray-400 mt-1">Overview & problems found</p>
                </div>
                <div className="text-xs text-gray-400">{review ? "Updated" : "No analysis"}</div>
              </div>

              <div className="mt-3 min-h-[60px]">
                <AnimatePresence mode="wait">
                  {review ? (
                    <motion.div key="review" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="text-sm text-gray-200">
                      {review.summary}
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-gray-400">No analysis yet.</motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium">Issues</h4>
                {!review ? (
                  <div className="text-sm text-gray-400 mt-2">—</div>
                ) : (
                  <ul className="mt-2 space-y-2 text-sm">
                    {review.issues.map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-8 text-xs font-mono">L{it.line}</span>
                        <div>
                          <div className="text-xs text-gray-300">[{it.severity}]</div>
                          <div className="text-sm">{it.message}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium">Refactor</h4>
                <AnimatePresence>
                  {!review ? (
                    <motion.div key="ref-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-gray-400 mt-2">—</motion.div>
                  ) : (
                    <motion.div key="ref" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                      <div className="text-sm text-gray-300 mt-2">{review.refactor.explain}</div>
                      <pre className={(theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900") + " rounded-md mt-2 p-3 text-xs overflow-auto max-h-36 font-mono border"}>
                        {review.refactor.code}
                      </pre>

                      <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <motion.button onClick={applyRefactor} className="px-3 py-2  bg-red-600 hover:bg-red-700  text-white rounded-md text-sm w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                          Apply Refactor
                        </motion.button>
                        <motion.button onClick={copyRefactor} className="px-3 py-2 border rounded-md text-sm flex items-center gap-2 w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                          <FiCopy />
                          <span>{copied ? "Copied" : "Copy"}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

              <div className="mt-4 text-xs text-gray-500">
                Tip: This page calls <code className="px-1 py-0.5 rounded bg-gray-700/40">/api/review</code>. Currently it returns a sample review.
              </div>
            </motion.div>
          </motion.aside>
        </main>
      </motion.div>
    </>
  );
}
