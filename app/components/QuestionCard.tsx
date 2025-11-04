"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import QuestionTag from "./QuestionTag";

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
    <div className="min-h-dvh flex items-center justify-center">
      <div className="w-full max-w-2xl border rounded-2xl border-gray-200 p-8 bg-white m-6">
        <div className="flex justify-between text-gray-400 text-xs tracking-widest mb-2">
          <p>QUESTION 1/5</p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="border-[0.5px] rounded-3xl px-3"
          >
            DETAILS
          </button>
        </div>
        <h1 className="text-4xl font-medium text-gray-900 mb-4 text-center">
          {question}
        </h1>
        {showDetails && (
          <div className="border rounded-2xl border-gray-200 p-4 mt-8">
            <p className="text-gray-400 font-semibold text-sm">GERMAN </p>
            <p className="mb-4">{questionGerman}</p>
            <div className="text-gray-600 text-sm flex justify-between">
              <p>Question By: {author}</p>
              <p>Year: {year}</p>
              <p>Episode: {episode}</p>
              <QuestionTag></QuestionTag>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
