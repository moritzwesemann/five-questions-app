import { supabase } from "@/lib/supabase/client";
import { updateTag } from "next/cache";

export async function getQuestion() {
  const data = await getTodaysQuestions();
  if (!data || data.length === 0) {
    console.log("Inside the getQuestion Function and no data is here");
    return;
  }

  const questionsArray = data.map((item) => item.questions);
  console.log("todays 5 questions");
  console.log(questionsArray);

  return questionsArray;
}

async function getTodaysQuestions() {
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

    console.log(daysData);

    if (!daysData) {
      console.error("Daysdata is empty");
      return;
    }

    console.log("created a new date");

    const day_id = daysData.id;

    await fillQuestions(day_id, today);
    await getTodaysQuestions();
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

    const { error: updateQuestionError } = await supabase
      .from("questions")
      .update({ used_at: today })
      .eq("id", question.id);

    if (updateQuestionError) {
      console.error(updateQuestionError);
    }
  }

  console.log(data);
}
