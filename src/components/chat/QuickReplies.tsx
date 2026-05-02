const suggestions = [
  "¿Qué iPhone me recomienda para fotos?",
  "¿Tienen iPhone reacondicionado?",
  "¿Cuál es el precio más económico?",
  "Quiero hablar con un asesor",
];

export default function QuickReplies({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="text-[11px] px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-400 hover:border-[#E3000B]/50 hover:text-white transition-colors"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
