export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--black)] pt-32 px-6 lg:px-10 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-16 lg:gap-24 animate-pulse">
        {/* Image skeleton */}
        <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-zinc-900 border border-white/5" />
        
        {/* Info skeleton */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 pt-4">
          <div className="w-24 h-4 bg-zinc-900 rounded" />
          <div className="w-3/4 h-12 bg-zinc-900 rounded" />
          <div className="w-full h-24 bg-zinc-900 rounded" />
          <div className="w-48 h-10 bg-zinc-900 rounded mt-4" />
          
          <div className="w-full h-px bg-white/5 my-4" />
          
          <div className="w-full h-20 bg-zinc-900 rounded" />
          <div className="w-full h-32 bg-zinc-900 rounded" />
        </div>
      </div>
    </div>
  );
}
