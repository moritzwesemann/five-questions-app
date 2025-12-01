import { supabase } from "@/lib/supabase/client";
import { Question } from "../types";

export async function getQuestion(): Promise<Question[] | undefined> {
  const data = await getTodaysQuestions();
  if (!data || data.length === 0) {
    console.log("Inside the getQuestion Function and no data is here");
    return;
  }

  const questionsArray = data.map((item) => item.questions);

  return questionsArray;
}

async function getTodaysQuestions(): Promise<any[] | undefined> {
  const today = new Date().toISOString().slice(0, 10);

  const { data: todaysData, error } = await supabase
    .from("days")
    .select()
    .eq("created_at", today);

  if (error) {
    console.error(error);
    return;
  }
  if (!todaysData || todaysData.length === 0) {
    console.log("We do not have an element for today yet");

    const { data: daysData, error: daysError } = await supabase
      .from("days")
      .insert([{ created_at: today }])
      .select()
      .single();

    if (daysError) {
      console.error(daysError);
    }

    if (!daysData) {
      console.error("Daysdata is empty");
      return;
    }

    console.log("created a new date");

    const day_id = daysData.id;

    await fillQuestions(day_id, today);
    const data = await getTodaysQuestions();
    return data;
  }

  const day_id = todaysData[0].id;

  const { data: dailyQuestions, error: dailyQuestionsError } = await supabase
    .from("day_questions")
    .select(`questions(*)`)
    .eq("day_id", day_id);

  if (dailyQuestionsError) {
    console.error(dailyQuestionsError);
    return;
  }

  return dailyQuestions;
}

async function fillQuestions(day_id: string, today: string) {
  const { data, error } = await supabase
    .from("questions")
    .select()
    .is("used_at", null)
    .limit(5);
  if (error) {
    console.error(error);
  }

  if (!data || data.length === 0) {
    console.error("there are no questions in the questions table");
    return;
  }

  for (const question of data) {
    const { error: connectError } = await supabase
      .from("day_questions")
      .insert([{ question_id: question.id, day_id: day_id }]);

    if (connectError) {
      console.error(connectError);
    }
  }
}

export async function markQuestionUsed(id: string) {
  const today = new Date().toISOString().slice(0, 10);

  const { error } = await supabase
    .from("questions")
    .update({ used_at: today })
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}

export async function markQuestionUnUsed(id: string) {
  const { error } = await supabase
    .from("questions")
    .update({ used_at: null })
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
