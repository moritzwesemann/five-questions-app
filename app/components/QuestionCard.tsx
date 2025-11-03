"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function QuestionCard() {
  const [question, setQuestion] = useState("Loading...");
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("questions").select();
      if (!data || data.length === 0) {
        return;
      }
      setQuestion(
        data[Math.floor(Math.random() * data.length)].question_english
      );
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 ">
      <div className="w-full max-w-md border rounded-xl p-4 bg-white">
        <h1> Question: {question}</h1>
        <p>Year: 2020</p>
        <p>Episode Number: 123</p>
        <p>Question By: Felix</p>
      </div>
    </div>
  );
}
