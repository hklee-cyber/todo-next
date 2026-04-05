"use client";

export type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  total: number;
  remaining: number;
  onClearCompleted: () => void;
}

export default function TodoFilter({
  current,
  onChange,
  total,
  remaining,
  onClearCompleted,
}: TodoFilterProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "active", label: "진행 중" },
    { key: "completed", label: "완료" },
  ];

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
      <span>{remaining}개 남음 / 총 {total}개</span>
      <div className="flex gap-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-1 rounded-md transition-colors ${
              current === key
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-200 text-slate-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={onClearCompleted}
        className="hover:text-red-500 transition-colors"
      >
        완료 삭제
      </button>
    </div>
  );
}
