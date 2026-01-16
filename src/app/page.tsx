export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome to Next.js</h1>
        <p className="text-gray-600">Trang chủ của ứng dụng</p>
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Đi đến trang đăng nhập
        </a>
      </div>
    </div>
  );
}
