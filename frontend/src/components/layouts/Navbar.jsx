import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800 bg-slate-950">
      
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        ⚡ TaskFlow
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="text-gray-300 hover:text-white"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;