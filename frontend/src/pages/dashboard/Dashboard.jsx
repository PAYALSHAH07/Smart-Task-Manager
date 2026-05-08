import { useEffect, useState, useCallback, useMemo } from "react";
import {
  FiPlus,
  FiTrash2,
  FiSearch,
  FiZap,
  FiStar,
  FiCalendar,
  FiFilter,
  FiCheckCircle,
  FiBell,
} from "react-icons/fi";

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
  const [dueDate, setDueDate] = useState("");

  const [urgent, setUrgent] = useState(false);
  const [important, setImportant] = useState(false);

  const [category, setCategory] = useState("Work");

  const [search, setSearch] = useState("");

  const [filterCategory, setFilterCategory] =
    useState("All");

  const [streak, setStreak] = useState(0);

  // 🔔 NOTIFICATION STATE
  const [notificationPermission, setNotificationPermission] =
    useState("default");

  // =========================
  // 🔔 REQUEST PERMISSION
  // =========================
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("Browser does not support notifications");
      return;
    }

    const permission =
      await Notification.requestPermission();

    setNotificationPermission(permission);

    if (permission === "granted") {
      new Notification(
        "🔔 Notifications Enabled",
        {
          body: "You will receive task reminders!",
        }
      );
    }
  };

  // =========================
  // 🔔 CHECK DUE TASKS
  // =========================
  // =========================
// 🔔 SMART REMINDER SYSTEM
// =========================
useEffect(() => {
  if (Notification.permission !== "granted") {
    return;
  }

  const interval = setInterval(() => {
    const now = new Date();

    todos.forEach((todo) => {

      // ❌ STOP IF COMPLETED
      if (todo.completed) return;

      // ❌ NO DATE
      if (!todo.dueDate) return;

      const due = new Date(todo.dueDate);

      // ⏰ HOURS LEFT
      const hoursLeft =
        (due.getTime() - now.getTime()) /
        (1000 * 60 * 60);

      // ✅ ONLY IF TASK IS WITHIN 24 HOURS
      if (hoursLeft > 0 && hoursLeft <= 24) {

        // 🔥 UNIQUE STORAGE KEY
        const notificationKey =
          `notification-${todo._id}`;

        // 🕒 LAST NOTIFICATION TIME
        const lastNotification =
          localStorage.getItem(notificationKey);

        const currentTime = Date.now();

        // ✅ FIRST TIME
        if (!lastNotification) {

          new Notification("⏰ Task Reminder", {
            body: `${todo.text} is pending`,
          });

          localStorage.setItem(
            notificationKey,
            currentTime
          );

          return;
        }

        // ✅ CHECK 1 HOUR GAP
        const oneHour =
          60 * 60 * 1000;

        if (
          currentTime -
            Number(lastNotification) >=
          oneHour
        ) {

          new Notification("⏰ Task Reminder", {
            body: `${todo.text} is still pending`,
          });

          localStorage.setItem(
            notificationKey,
            currentTime
          );
        }
      }

      // ✅ REMOVE STORAGE WHEN COMPLETED
      if (todo.completed) {
        localStorage.removeItem(
          `notification-${todo._id}`
        );
      }
    });
  }, 60000); // checks every minute

  return () => clearInterval(interval);

}, [todos]);

  // =========================
  // 📥 FETCH TODOS
  // =========================
  const fetchTodos = useCallback(async () => {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    const data = await getTodos(token);

    const todoArray = Array.isArray(data)
      ? data
      : [];

    setTodos(todoArray);

    // 🔥 STREAK
    const completedDates = [
      ...new Set(
        todoArray
          .filter((t) => t.completed)
          .map((t) =>
            new Date(
              t.updatedAt
            ).toDateString()
          )
      ),
    ];

    let streakCount = 0;

    let checkDate = new Date();

    while (
      completedDates.includes(
        checkDate.toDateString()
      )
    ) {
      streakCount++;

      checkDate.setDate(
        checkDate.getDate() - 1
      );
    }

    setStreak(streakCount);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // =========================
  // 🔍 FILTERED TODOS
  // =========================
  const filteredTodos = useMemo(() => {
    return todos.filter(
      (t) =>
        t.text
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) &&
        (filterCategory === "All" ||
          t.category ===
            filterCategory)
    );
  }, [todos, search, filterCategory]);

  // =========================
  // ➕ ADD TODO
  // =========================
  const addTodo = async () => {
    if (!text.trim()) return;

    const token =
      localStorage.getItem("token");

    await createTodo(
      {
        text,
        dueDate,
        urgent,
        important,
        category,
      },
      token
    );

    setText("");
    setUrgent(false);
    setImportant(false);
    setDueDate("");

    fetchTodos();
  };

  // =========================
  // ❌ DELETE TODO
  // =========================
  const removeTodo = async (id) => {
    await deleteTodo(
      id,
      localStorage.getItem("token")
    );

    fetchTodos();
  };

  // =========================
  // ✅ TOGGLE TODO
  // =========================
  const handleToggle = async (id) => {
    await toggleTodo(
      id,
      localStorage.getItem("token")
    );

    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-4 md:p-8">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Hello,{" "}
            <span className="text-blue-500">
              {user?.name || "User"}
            </span>
          </h1>

          <p className="text-slate-400 mt-1 text-lg">
            Your productivity summary
            today 🚀
          </p>
        </div>

        <div className="flex gap-4">

          {/* 🔥 STREAK */}
          <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">

            <div className="px-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold">
                Streak
              </p>

              <p className="text-2xl font-black text-white">
                {streak} 🔥
              </p>
            </div>

          </div>

          {/* 🔔 NOTIFICATION BUTTON */}
          <button
            onClick={
              requestNotificationPermission
            }
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg"
          >
            <FiBell />

            {notificationPermission ===
            "granted"
              ? "Notifications On"
              : "Enable Reminder"}
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-6">

          {/* ADD TASK */}
          <section className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl">

            <div className="flex flex-col gap-4">

              <div className="flex gap-3">

                <input
                  value={text}
                  onChange={(e) =>
                    setText(e.target.value)
                  }
                  placeholder="Add task..."
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none"
                />

                <button
                  onClick={addTodo}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-xl font-bold flex items-center gap-2"
                >
                  <FiPlus />
                  Add
                </button>

              </div>

              {/* CONTROLS */}
              <div className="flex flex-wrap gap-3 items-center">

                {/* CATEGORY */}
                <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-700">

                  {[
                    "Work",
                    "Study",
                    "Personal",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        setCategory(cat)
                      }
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        category === cat
                          ? "bg-slate-700 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                </div>

                {/* DATE */}
                <div className="relative">

                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(
                        e.target.value
                      )
                    }
                    className="bg-slate-900/50 border border-slate-700 rounded-lg pl-9 pr-3 py-2 outline-none"
                  />

                </div>

                {/* URGENT */}
                <button
                  onClick={() =>
                    setUrgent(!urgent)
                  }
                  className={`p-2 rounded-lg border ${
                    urgent
                      ? "bg-red-500/20 border-red-500 text-red-500"
                      : "border-slate-700 text-slate-500"
                  }`}
                >
                  <FiZap />
                </button>

                {/* IMPORTANT */}
                <button
                  onClick={() =>
                    setImportant(
                      !important
                    )
                  }
                  className={`p-2 rounded-lg border ${
                    important
                      ? "bg-yellow-500/20 border-yellow-500 text-yellow-500"
                      : "border-slate-700 text-slate-500"
                  }`}
                >
                  <FiStar />
                </button>

              </div>

            </div>

          </section>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/30 p-2 rounded-2xl border border-slate-800">

            {/* SEARCH */}
            <div className="relative w-full md:w-80">

              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full bg-transparent border-none pl-10 pr-4 py-2 outline-none text-sm"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            {/* FILTER */}
            <div className="flex gap-2">

              <FiFilter className="text-slate-600 mt-2 mr-1" />

              {[
                "All",
                "Work",
                "Study",
                "Personal",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setFilterCategory(cat)
                  }
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold ${
                    filterCategory === cat
                      ? "bg-slate-700 text-white"
                      : "text-slate-500"
                  }`}
                >
                  {cat}
                </button>
              ))}

            </div>

          </div>

          {/* TASK LIST */}
          <div className="grid gap-3">

            {filteredTodos.map((t) => (

              <div
                key={t._id}
                className="group flex items-center justify-between bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/40 p-4 rounded-2xl transition-all"
              >

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      handleToggle(t._id)
                    }
                    className={`text-2xl ${
                      t.completed
                        ? "text-green-500"
                        : "text-slate-600"
                    }`}
                  >
                    <FiCheckCircle />
                  </button>

                  <div>

                    <p
                      className={`font-medium text-lg ${
                        t.completed
                          ? "line-through text-slate-500"
                          : "text-slate-200"
                      }`}
                    >
                      {t.text}
                    </p>

                    <div className="flex gap-3 mt-1">

                      <span className="text-[11px] text-slate-500">
                        {t.category}
                      </span>

                      <span className="text-[11px] text-slate-500">
                        {t.dueDate
                          ? new Date(
                              t.dueDate
                            ).toLocaleDateString()
                          : "No Date"}
                      </span>

                    </div>

                  </div>

                </div>

                {/* DELETE */}
                <button
                  onClick={() =>
                    removeTodo(t._id)
                  }
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-500 transition-all"
                >
                  <FiTrash2 size={18} />
                </button>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 space-y-8">

          {/* MATRIX */}
          <section className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl">

            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Focus Matrix
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-red-500/10 p-4 rounded-2xl text-center">
                <p className="text-xl font-black text-red-500">
                  {
                    todos.filter(
                      (t) =>
                        t.urgent &&
                        t.important
                    ).length
                  }
                </p>

                <p className="text-[10px] uppercase text-red-400">
                  Do First
                </p>
              </div>

              <div className="bg-yellow-500/10 p-4 rounded-2xl text-center">
                <p className="text-xl font-black text-yellow-500">
                  {
                    todos.filter(
                      (t) =>
                        !t.urgent &&
                        t.important
                    ).length
                  }
                </p>

                <p className="text-[10px] uppercase text-yellow-400">
                  Schedule
                </p>
              </div>

              <div className="bg-blue-500/10 p-4 rounded-2xl text-center">
                <p className="text-xl font-black text-blue-500">
                  {
                    todos.filter(
                      (t) =>
                        t.urgent &&
                        !t.important
                    ).length
                  }
                </p>

                <p className="text-[10px] uppercase text-blue-400">
                  Delegate
                </p>
              </div>

              <div className="bg-slate-700/20 p-4 rounded-2xl text-center">
                <p className="text-xl font-black text-slate-400">
                  {
                    todos.filter(
                      (t) =>
                        !t.urgent &&
                        !t.important
                    ).length
                  }
                </p>

                <p className="text-[10px] uppercase text-slate-500">
                  Audit
                </p>
              </div>

            </div>

          </section>

          {/* CHARTS */}
          <section className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl">

            <Charts todos={todos} />

          </section>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;