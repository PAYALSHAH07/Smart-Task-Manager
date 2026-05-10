const BASE_URL = "https://smart-task-manager-o4a6.onrender.com/api";

/* ================= AUTH ================= */

// 🔐 LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// 📝 REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


/* ================= TODOS ================= */

// 📥 GET TODOS
export const getTodos = async (token) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


// ➕ CREATE TODO
export const createTodo = async (data, token) => {
  console.log("SENDING TODO:", data);

  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    // ✅ FIXED
    body: JSON.stringify({
      text: data.text,
      priority: data.priority,
      dueDate: data.dueDate,
      urgent: data.urgent,
      important: data.important,

      // 🔥 THIS WAS MISSING
      category: data.category,
    }),
  });

  return res.json();
};


// ❌ DELETE TODO
export const deleteTodo = async (id, token) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


// 🔁 TOGGLE TODO
export const toggleTodo = async (id, token) => {
  const res = await fetch(`${BASE_URL}/todos/toggle/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


// ✏️ UPDATE TODO
export const updateTodo = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};