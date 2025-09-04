import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { quizData } from "../quizData";

export default function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="h-screen ">
      <Header />
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[500px] bg-[#212020e7] rounded-tl-2xl rounded-br-2xl">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl text-white mb-8">Welcome to Quizzer</h1>
          <button
            onClick={handleStartQuiz}
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-full font-semibold cursor-pointer"
          >
            Start Quiz
          </button>


        </div>
      </div>
    </div>
  );
}
