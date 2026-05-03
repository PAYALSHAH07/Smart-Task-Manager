import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24">

      <h1 className="text-4xl md:text-6xl font-bold">
        Manage Your Tasks <br />
        <span className="text-blue-500">Smarter & Faster</span>
      </h1>

      <p className="mt-6 text-gray-400 max-w-xl">
        Organize your work, boost productivity, and achieve more.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-slate-800"
        >
          Login
        </button>
      </div>

    </section>
  );
};

export default Hero;