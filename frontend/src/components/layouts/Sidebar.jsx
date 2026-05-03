import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4">

      <div>
        <h2 className="text-lg font-bold mb-6">⚡ TaskFlow</h2>

        <p
          className="mb-3 cursor-pointer hover:text-blue-400"
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </p>

        <p
          className="cursor-pointer hover:text-blue-400"
          onClick={() => navigate("/todos")}
        >
          📝 Todos
        </p>
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="bg-red-500 p-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;