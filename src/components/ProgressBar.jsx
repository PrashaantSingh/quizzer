

export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      <div
        className="bg-amber-600 h-3 rounded-full transition-all linear duration-500"
        style={{ width: `${percent}%` }}
      ></div>
      <div className="text-xs text-amber-50 mt-1">
        Question {current} of {total}
      </div>
    </div>
  );
}
