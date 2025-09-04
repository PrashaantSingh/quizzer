export default function Quiz({ ques, setSelectedAns, selectedAns, quesId,disabled }) {
  function handleSelect(selected) {
    const updated = [...selectedAns];
    updated[quesId] = selected;
    setSelectedAns(updated);
  }
  return (
    <div className="mb-7 p-4 fadeAnimation" key={quesId}>
      <h2 className="text-2xl mb-5 text-amber-50">{ques.question}</h2>
      <div className="grid grid-cols-1 gap-3">
        {ques.options.map((option, idx) => (
          <button
            key={idx}
            disabled={disabled}
            className={`px-4 py-3 rounded-lg cursor-pointer text-left ${"disabled:cursor-not-allowed"} ${
              selectedAns[quesId] === option
                ? "bg-amber-500 text-white"
                : "bg-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
