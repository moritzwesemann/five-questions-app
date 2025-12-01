"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getQuestion } from "@/lib/services/dailyQuestionService";
import QuestionTag from "./QuestionTag";
import Buttons from "./Buttons";
import { Question } from "@/lib/types";

export default function QuestionCard() {
  const [questionsArray, setQuestionsArray] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestion();
      if (!data || data.length === 0) {
        return;
      }
      console.log(data);
      setQuestionsArray(data);
    };
    fetchQuestions();
  }, []);

  const currentQuestion = questionsArray[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-4">
        <div className="border rounded-3xl border-gray-200 p-8 bg-white shadow-xl shadow-gray-200/80">
          <div className="flex justify-between font-light text-gray-400 text-xs tracking-widest mb-8">
            <p>QUESTION {currentIndex + 1}/5</p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="border-[0.5px] rounded-3xl px-3 font-medium"
            >
              DETAILS
            </button>
          </div>
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            {currentQuestion?.question_english || "Loading..."}
          </h1>
          {showDetails && (
            <div className="border rounded-2xl border-gray-200 p-4 mt-8">
              <p className="text-gray-400 font-medium text-sm">GERMAN </p>
              <p className="mb-4">
                {currentQuestion?.question_german || "Loading..."}
              </p>
              <div className="text-gray-600 text-sm grid grid-cols-3">
                <QuestionTag
                  author={currentQuestion?.source_name || "Loading..."}
                  year={String(currentQuestion?.question_year || "Loading...")}
                  episode={String(
                    currentQuestion?.episode_number || "Loading..."
                  )}
                ></QuestionTag>
              </div>
            </div>
          )}
        </div>

        <Buttons onNext={handleNext} onPrevious={handlePrevious}></Buttons>
      </div>
    </div>
  );
}
