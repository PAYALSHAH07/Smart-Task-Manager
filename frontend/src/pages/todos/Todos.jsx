import { useEffect, useState } from "react";
import { getTodos } from "../../services/api";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔥 always fresh token

      if (!token) {
        console.log("No token found");
        return;
      }

      const data = await getTodos(token);

      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching todos:", error);
      setTodos([]);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-xl mb-4">All Todos</h2>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p>No todos found</p>
        ) : (
          todos.map((t) => (
            <div key={t._id} className="bg-slate-800 p-3 rounded">
              {t.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todos;