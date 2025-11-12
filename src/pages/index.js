import Link from "next/link";
import { FiGithub } from "react-icons/fi";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white transition-colors duration-500">
      <div className="max-w-2xl w-full p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-white">CodeMentor AI</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
          A minimalist JS MVP — analyze code, get feedback, and refactor smarter. This is a preview version built for
          clarity, not complexity.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/editor"
            className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Open Editor
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 flex items-center justify-center gap-2 border border-white/30 text-white rounded-xl font-medium hover:bg-white hover:text-black transition-all duration-200"
          >
            <FiGithub size={18} /> View Repo (soon)
          </a>
        </div>

        <footer className="mt-10 text-xs text-gray-500">© {new Date().getFullYear()} CodeMentor Labs</footer>
      </div>
    </div>
  );
}

// Export the page component
export default Home;