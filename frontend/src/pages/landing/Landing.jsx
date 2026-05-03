import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
       <span className="text-blue-500"></span>
      <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
        Smart Task Manager
      </span>
       </h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Manage Your Tasks Smarter 🚀
        </h1>

        <p className="text-slate-400 max-w-xl mb-6">
          A simple and powerful todo app to organize your life,
          boost productivity, and never miss anything.
        </p>

        <Link
          to="/register"
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Start for Free
        </Link>
      </div>

    </div>
  );
};

export default Landing;