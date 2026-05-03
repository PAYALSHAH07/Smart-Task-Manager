// src/hooks/useTodos.js

import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo } from "../services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const data = await getTodos(token);
    setTodos(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    if (!text.trim()) return;
    await createTodo({ text }, token);
    fetchTodos();
  };

  const removeTodo = async (id) => {
    await deleteTodo(id, token);
    fetchTodos();
  };

  return { todos, addTodo, removeTodo };
};

export default useTodos;