export default function ForbiddenPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-pink-100">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl border border-pink-300">
          <h1 className="text-7xl font-extrabold text-pink-500">403</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Forbidden</h2>
          <p className="text-gray-600 mt-2">You don’t have permission to access this page.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-8 py-3 bg-pink-500 text-white font-medium rounded-full shadow-md hover:bg-pink-600 transition transform hover:scale-105"
          >
            Take Me Home
          </button>
        </div>
      </div>
    );
  }
  