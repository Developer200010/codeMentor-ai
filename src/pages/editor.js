import { useEffect, useState } from "react";
import Head from "next/head";
import { FiSun, FiMoon, FiCopy, FiLoader, FiCheck } from "react-icons/fi";

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
    // keep body background in-sync for a full-page feel
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
      document.documentElement.classList.add(theme);
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

  return (
    <>
      <Head>
        <title>CodeMentor Demo — Editor</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <div className={theme === "dark" ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-gray-50 text-gray-900"}>
        <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg text-white font-bold">CM</div>
            <div>
              <h1 className="text-lg font-semibold">CodeMentor — Editor</h1>
              <p className="text-sm text-gray-400">Quick code review, refactor suggestions & issues</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-transparent border rounded-lg px-3 py-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={theme === "dark" ? "bg-gray-900 text-gray-100 outline-none" : "bg-gray-50 text-gray-900 outline-none"}
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
              </select>
            </div>

            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            <button
              onClick={analyze}
              disabled={loading}
              className="ml-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {loading ? <FiLoader className="animate-spin" /> : <FiCheck />}
              <span>{loading ? "Analyzing..." : "Analyze"}</span>
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <label className="text-sm text-gray-400">Filename</label>
            <input
              value={"snippet." + (language === "python" ? "py" : language === "typescript" ? "ts" : "js")}
              readOnly
              className={theme === "dark" ? "w-full mt-2 mb-3 px-3 py-2 bg-gray-800 rounded-md text-sm text-gray-200 border border-gray-800" : "w-full mt-2 mb-3 px-3 py-2 bg-white rounded-md text-sm text-gray-800 border"}
            />

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className={
                (theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900") +
                " w-full min-h-[60vh] rounded-lg shadow-md p-4 font-mono text-sm resize-none border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }
            />

            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => { setCode(SAMPLE_CODE); setReview(null); }} className="px-3 py-2 border rounded-md text-sm">Reset</button>
              <button onClick={() => navigator.clipboard?.writeText(code)} className="px-3 py-2 border rounded-md text-sm">Copy</button>
              <div className="text-sm text-gray-400 ml-auto">{code.split('\n').length} lines</div>
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className={
              (theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900") +
              " rounded-lg shadow p-4 sticky top-6 border"
            }>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Quick Summary</h3>
                  <p className="text-sm text-gray-400 mt-1">Overview & problems found</p>
                </div>
                <div className="text-xs text-gray-400">{review ? "Updated" : "No analysis"}</div>
              </div>

              <div className="mt-3 min-h-[60px]">
                {review ? <div className="text-sm text-gray-200">{review.summary}</div> : <div className="text-sm text-gray-400">No analysis yet.</div>}
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
                {!review ? (
                  <div className="text-sm text-gray-400 mt-2">—</div>
                ) : (
                  <>
                    <div className="text-sm text-gray-300 mt-2">{review.refactor.explain}</div>
                    <pre className={
                      (theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900") +
                      " rounded-md mt-2 p-3 text-xs overflow-auto max-h-36 font-mono border"
                    }>
                      {review.refactor.code}
                    </pre>

                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={applyRefactor} className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Apply Refactor</button>
                      <button onClick={copyRefactor} className="px-3 py-2 border rounded-md text-sm flex items-center gap-2">
                        <FiCopy />
                        <span>{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

              <div className="mt-4 text-xs text-gray-500">
                Tip: This page calls <code className="px-1 py-0.5 rounded bg-gray-700/40">/api/review</code>. Currently it returns a sample review.
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
