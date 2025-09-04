import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  let prevState = null;
  try {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      prevState = JSON.parse(storedState);
    }
  } catch (error) {
    console.warn("Error parsing stored state:", error);
    prevState = null;
  }

  const highestScore = localStorage.getItem("highestScore") || 0;


  const currentState = location.state || prevState;
  if (currentState) {
    localStorage.setItem("state", JSON.stringify(currentState));
  }

  localStorage.setItem(
    "highestScore",
    Math.max(highestScore, location.state?.score || 0)
  );

  const {
    selectedAns = [],
    quizData = [],
    score = 0,
  } = location.state || prevState || {};

  const handleRestart = () => {
    navigate("/", { replace: true });
  };

  if (!quizData.length) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-amber-50">
          No Quiz Data Available
        </h2>
        <button
          onClick={handleRestart}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-amber-50">Result</h1>
        <div className="text-2xl mb-2 text-amber-50">
          Your Score:{" "}
          <span className="font-bold text-amber-600">
            {score}/{quizData.length}
          </span>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {quizData.map((question, idx) => {
          const userAnswer = selectedAns[idx];
          const isCorrect = userAnswer === question.answer;

          return (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-gray-300 shadow-sm"
            >
              <h3 className="font-semibold mb-3">
                Question {idx + 1}: {question.question}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Your Answer:</span>
                  <span
                    className={`px-2 py-1 font-semibold ${
                      isCorrect ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {userAnswer || "Unanswered"}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Correct Answer:</span>
                    <span className="px-2 py-1 text-green-800 font-semibold">
                      {question.answer}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={handleRestart}
          className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold cursor-pointer"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
