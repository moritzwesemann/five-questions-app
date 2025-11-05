import React from "react";

type QuestionTagProps = {
  author: string;
  year: string;
  episode: string;
};

export default function QuestionTag(props: QuestionTagProps) {
  return (
    <>
      <p className="text-left">Question By: {props.author}</p>
      <p className="text-center">Year: {props.year}</p>
      <p className="text-right">Episode: {props.episode}</p>
    </>
  );
}
