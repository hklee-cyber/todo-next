import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          TODO 리스트
        </h1>
        <p className="text-slate-500 text-center mb-8">
          할 일을 관리하고 우선순위를 설정하세요
        </p>
        <TodoList />
      </div>
    </main>
  );
}
