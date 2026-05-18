import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="text-sm uppercase tracking-[0.4em] text-red-400/80 mb-6">
          Error 404
        </p>
        <h1 className="text-8xl sm:text-9xl font-black text-white mb-6">
          4<span className="text-red-600">0</span>4
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-red-900/40 transition-all hover:from-red-700 hover:to-red-900 hover:scale-[1.03]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
