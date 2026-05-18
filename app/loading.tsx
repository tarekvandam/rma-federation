export default function Loading() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative h-16 w-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-red-600/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 animate-spin" />
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-red-400/80">
          Loading...
        </p>
      </div>
    </div>
  );
}
