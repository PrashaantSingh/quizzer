import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { quizData } from "../quizData";
import Header from "../components/Header";

const timerDuration = 15;
export default function Quiz() {
  const [quesId, setQuesId] = useState(0);
  const [selectedAns, setSelectedAns] = useState([]);
  const [timer, setTimer] = useState(timerDuration);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (timer <= 0) {
      if (quesId < quizData.length - 1) {
        setQuesId((cur) => cur + 1);
        setTimer(timerDuration);
      } else {
        setTimer(0);
      }
    }
  }, [timer, quesId]);

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  useEffect(() => {
    setTimer(timerDuration);
  }, [quesId]);

  useEffect(() => {
    setIsDisabled(selectedAns[quesId] === undefined);
    if (timer === 0 && quesId === quizData.length - 1) {
      setIsDisabled(false);
    }
  }, [timer, selectedAns, quesId]);

  const ques = quizData[quesId];

  const handleNext = () => {
    if (quesId === quizData.length - 1) {
      navigate("/results", {
        state: {
          selectedAns,
          quizData,
          score: calculateScore(),
        },
      });
    } else {
      setQuesId((cur) => cur + 1);
    }
  };

  const calculateScore = () => {
    return selectedAns.reduce((score, answer, index) => {
      return answer === quizData[index].answer ? score + 1 : score;
    }, 0);
  };

  const highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center text-white mb-4 font-semibold text-xl">
          <div className="flex items-center gap-4">
            <div>Highest Score: {highestScore}</div>
          </div>
          <div className="text-2xl font-bold">
            {String(timer).padStart(2, "0")}s
          </div>
        </div>

        <ProgressBar current={quesId + 1} total={quizData.length} />
        <QuestionCard
          ques={ques}
          setSelectedAns={setSelectedAns}
          selectedAns={selectedAns}
          quesId={quesId}
          disabled={timer == 0}
        />

        <div className="flex items-center justify-between mt-6">
          <span className="text-lg font-semibold text-amber-50">
            Question {quesId + 1} of {quizData.length}
          </span>

          <button
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors disabled:opacity-[60%] disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={isDisabled}
          >
            {quesId === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </div>
    </>
  );
}
