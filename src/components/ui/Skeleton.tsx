export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg animate-pulse ${className}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    />
  );
}
