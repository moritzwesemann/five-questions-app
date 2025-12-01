interface ButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isMarked: boolean;
  onToggleMark: () => void;
}

export default function Buttons({
  onNext,
  onPrevious,
  isMarked,
  onToggleMark,
}: ButtonsProps) {
  return (
    <div className="flex justify-center w-full text-sm">
      <div className="w-full space-y-2">
        <button
          onClick={onToggleMark}
          className="border rounded-full p-3 w-full bg-emerald-500 hover:bg-emerald-600 transition border-gray-200 font-semibold text-white"
        >
          {isMarked ? "Mark as unused" : "Mark as used"}
        </button>
        <div className="w-full flex justify-between gap-2">
          <button
            onClick={onPrevious}
            className="border rounded-full p-3 flex-1 bg-white border-gray-200 hover:border-gray-300 transition"
          >
            &lt; Previous
          </button>
          <button
            onClick={onNext}
            className="border rounded-full p-3 flex-1 bg-white border-gray-200 hover:border-gray-300 transition"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
