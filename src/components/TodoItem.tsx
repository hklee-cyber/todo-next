"use client";

import { Todo } from "@/types/todo";

const priorityConfig = {
  low: { label: "낮음", className: "bg-green-100 text-green-700" },
  medium: { label: "중간", className: "bg-yellow-100 text-yellow-700" },
  high: { label: "높음", className: "bg-red-100 text-red-700" },
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { label, className } = priorityConfig[todo.priority];

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded accent-blue-600 cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-slate-800 transition-all ${
          todo.completed ? "line-through text-slate-400" : ""
        }`}
      >
        {todo.text}
      </span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${className}`}>
        {label}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
        className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
