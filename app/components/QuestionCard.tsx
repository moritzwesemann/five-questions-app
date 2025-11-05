"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import QuestionTag from "./QuestionTag";
import Buttons from "./Buttons";

export default function QuestionCard() {
  const [question, setQuestion] = useState("Loading...");
  const [episode, setEpisode] = useState("Loading...");
  const [year, setYear] = useState("Loading...");
  const [author, setAuthor] = useState("Loading...");
  const [questionGerman, setQuestionGerman] = useState("Loading...");

  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("questions").select();
      if (!data || data.length === 0) {
        console.log(error);
        return;
      }
      const randomNumber = Math.floor(Math.random() * data.length);

      setQuestion(data[randomNumber].question_english);
      setEpisode(data[randomNumber].episode_number);
      setYear(data[randomNumber].question_year);
      setAuthor(data[randomNumber].source_name);
      setQuestionGerman(data[randomNumber].question_german);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-4">
        <div className="border rounded-3xl border-gray-200 p-8 bg-white shadow-xl shadow-gray-200/80">
          <div className="flex justify-between font-light text-gray-400 text-xs tracking-widest mb-8">
            <p>QUESTION 1/5</p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="border-[0.5px] rounded-3xl px-3 font-medium"
            >
              DETAILS
            </button>
          </div>
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            {question}
          </h1>
          {showDetails && (
            <div className="border rounded-2xl border-gray-200 p-4 mt-8">
              <p className="text-gray-400 font-medium text-sm">GERMAN </p>
              <p className="mb-4">{questionGerman}</p>
              <div className="text-gray-600 text-sm grid grid-cols-3">
                <QuestionTag
                  author={author}
                  year={year}
                  episode={episode}
                ></QuestionTag>
              </div>
            </div>
          )}
        </div>

        <Buttons></Buttons>
      </div>
    </div>
  );
}
