"use client";

import { useState, useEffect } from "react";
import { Todo, Priority } from "@/types/todo";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoFilter, { FilterType } from "./TodoFilter";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

const STORAGE_KEY = "todos";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Todo[];
        setTodos(
          parsed.map((t) => ({ ...t, createdAt: new Date(t.createdAt) }))
        );
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = (text: string, priority: Priority) => {
    setTodos((prev) => [
      {
        id: generateId(),
        text,
        completed: false,
        priority,
        createdAt: new Date(),
      },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  if (!mounted) return null;

  return (
    <div className="w-full max-w-lg mx-auto">
      <TodoForm onAdd={addTodo} />
      {filtered.length === 0 ? (
        <p className="text-center text-slate-400 py-12">
          {filter === "completed" ? "완료된 항목이 없습니다." : "할 일을 추가해 보세요!"}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
      <TodoFilter
        current={filter}
        onChange={setFilter}
        total={todos.length}
        remaining={remaining}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}
