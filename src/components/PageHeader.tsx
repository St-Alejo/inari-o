export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-4xl mx-auto px-6 lg:px-10 pt-32 pb-12 lg:pt-40 lg:pb-16">
      {eyebrow && <span className="pill-label mb-5">{eyebrow}</span>}
      <h1
        className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h1>
      {description && (
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </header>
  );
}
