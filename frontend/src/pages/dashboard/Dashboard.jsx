import { useEffect, useState, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
} from "../../services/api";
import Charts from "../../components/Charts";

const Dashboard = () => {
  const { user } = useAuth();

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const [urgent, setUrgent] = useState(false);
  const [important, setImportant] = useState(false);

  const [streak, setStreak] = useState(0);

  // 🎯 DUE DATE COLOR
  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "text-gray-400";

    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = (due - today) / (1000 * 60 * 60 * 24);

    if (diffDays <= 1) return "text-red-400";
    if (diffDays <= 3) return "text-yellow-400";
    return "text-green-400";
  };

  // 🎯 DUE LABEL
  const getDueLabel = (dueDate) => {
    if (!dueDate) return "";

    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "⚠️ Overdue";
    if (diffDays === 1) return "⏳ Tomorrow";
    return `${diffDays} days left`;
  };

  // 📥 FETCH TODOS
  const fetchTodos = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = await getTodos(token);
    const todoArray = Array.isArray(data) ? data : [];

    setTodos(todoArray);

    // 🔥 STREAK CALCULATION
    const today = new Date().toDateString();
    const completedToday = todoArray.some(
      (t) =>
        t.completed &&
        new Date(t.updatedAt).toDateString() === today
    );

    setStreak(completedToday ? 1 : 0);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ➕ ADD TODO
  const addTodo = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    await createTodo(
      { text, priority, dueDate, urgent, important },
      token
    );

    setText("");
    setPriority("low");
    setDueDate("");
    setUrgent(false);
    setImportant(false);

    fetchTodos();
  };

  // ❌ DELETE
  const removeTodo = async (id) => {
    const token = localStorage.getItem("token");
    await deleteTodo(id, token);
    fetchTodos();
  };

  // 🔁 TOGGLE
  const handleToggle = async (id) => {
    const token = localStorage.getItem("token");
    await toggleTodo(id, token);
    fetchTodos();
  };

  // 📊 STATS
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const high = todos.filter((t) => t.priority === "high").length;

  // 🔥 MATRIX
  const q1 = todos.filter((t) => t.urgent && t.important);
  const q2 = todos.filter((t) => !t.urgent && t.important);
  const q3 = todos.filter((t) => t.urgent && !t.important);
  const q4 = todos.filter((t) => !t.urgent && !t.important);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* 👤 HEADER */}
      <div className="mb-8 flex justify-between items-center">

  <div>
    <h1 className="text-3xl font-bold">
      Hello {user?.name || "User"} 👋
    </h1>
    <p className="text-gray-400 text-sm">
      Stay productive today 🚀
    </p>
  </div>

  {/* 🔥 STREAK BOX */}
  <div className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-xl text-center">
    <p className="text-xs">🔥 Streak</p>
    <h2 className="text-xl font-bold">{streak} day</h2>
  </div>

</div>
      

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Total</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-600 p-5 rounded-2xl">
          <p>Completed</p>
          <h2 className="text-2xl font-bold">{completed}</h2>
        </div>

        <div className="bg-yellow-500 p-5 rounded-2xl">
          <p>Pending</p>
          <h2 className="text-2xl font-bold">{pending}</h2>
        </div>

        <div className="bg-red-600 p-5 rounded-2xl">
          <p>High</p>
          <h2 className="text-2xl font-bold">{high}</h2>
        </div>
      </div>

      {/* ➕ ADD TASK (OLD STYLE) */}
      <div className="flex flex-wrap gap-2 mb-6 bg-slate-800 p-3 rounded">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task..."
          className="flex-1 min-w-[150px] p-2 rounded bg-slate-700"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded bg-slate-700"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 rounded bg-slate-700"
        />

        {/* ✅ CLEAN CHECKBOX UI */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={urgent}
            onChange={() => setUrgent((prev) => !prev)}
          />
          ⚡
        </label>

        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={important}
            onChange={() => setImportant((prev) => !prev)}
          />
          ⭐
        </label>

        <button
          onClick={addTodo}
          className="bg-blue-600 px-4 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* 📋 TASK LIST */}
      <div className="space-y-3">
        {todos.map((t) => (
          <div key={t._id} className="flex justify-between bg-slate-800 p-4 rounded-xl">

            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggle(t._id)}
              />

              <div>
                <p className={t.completed ? "line-through text-gray-400" : ""}>
                  {t.text}
                </p>
                <p className="text-xs text-gray-400">
                  {getDueLabel(t.dueDate)}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">

              {/* 🔥 BADGES */}
              {t.urgent && (
                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                  ⚡ Urgent
                </span>
              )}

              {t.important && (
                <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                  ⭐ Important
                </span>
              )}

              <span className={getDueDateColor(t.dueDate)}>
                {t.dueDate
                  ? new Date(t.dueDate).toLocaleDateString()
                  : ""}
              </span>

              <button onClick={() => removeTodo(t._id)}>✕</button>
            </div>

          </div>
        ))}
      </div>

      {/* 🔥 MATRIX */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">🧠 Priority Matrix</h2>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-red-900 p-4 rounded">
            <h3>🔥 Urgent & Important</h3>
            {q1.map(t => <p key={t._id}>{t.text}</p>)}
          </div>

          <div className="bg-green-900 p-4 rounded">
            <h3>📅 Important</h3>
            {q2.map(t => <p key={t._id}>{t.text}</p>)}
          </div>

          <div className="bg-yellow-800 p-4 rounded">
            <h3>⚡ Urgent</h3>
            {q3.map(t => <p key={t._id}>{t.text}</p>)}
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>❌ Not Important</h3>
            {q4.map(t => <p key={t._id}>{t.text}</p>)}
          </div>

        </div>
      </div>

      {/* 📊 CHARTS */}
      <Charts todos={todos} />

    </div>
  );
};

export default Dashboard;