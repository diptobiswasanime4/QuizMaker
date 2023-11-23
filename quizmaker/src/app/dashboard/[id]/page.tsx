"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getOptionFromIndex from "@/utils/getOptionFromIndex";
import { useRouter } from "next/navigation";

function Question({ params }) {
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedIndexBG, setSelectedIndexBG] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const resp = await axios.get(`/api/dashboard`);
      setQuestions(resp.data.data);
      const selectedQuiz = resp.data.data.find(
        (q) => q.quizIndex === params.id
      );
      setQuiz(selectedQuiz);
      setSelectedIndexBG(selectedQuiz.options.map(() => " bg-blue-400"));
      setIsLoading(false);
    }

    getData();
  }, [params.id]);

  async function loadNextQuestion() {
    const curIndex = questions.findIndex((q) => q.quizIndex === params.id);
    const nextId =
      questions[curIndex + 1 == questions.length ? 0 : curIndex + 1].quizIndex;
    router.push(`/dashboard/${nextId}`);
  }

  async function loadPrevQuestion() {
    const curIndex = questions.findIndex((q) => q.quizIndex === params.id);
    const prevId =
      questions[curIndex - 1 == -1 ? questions.length - 1 : curIndex - 1]
        .quizIndex;
    router.push(`/dashboard/${prevId}`);
  }

  async function selectIndices(index) {
    setSelectedIndices((prevIndices) => {
      const indexExists = prevIndices.includes(index);

      if (indexExists) {
        const newIndices = prevIndices.filter(
          (prevIndex) => prevIndex !== index
        );
        return newIndices;
      } else {
        return [...prevIndices, index];
      }
    });
    setSelectedIndexBG((prevIndices) => {
      const newBg = [...prevIndices];
      newBg[index] =
        newBg[index] !== " bg-blue-700" ? " bg-blue-700" : " bg-blue-400";
      return newBg;
    });
  }

  async function checkAnswer() {
    const correctIndices = quiz.rightAnswerIndices;
    const incorrectIndices = selectedIndices.filter(
      (i) => !correctIndices.includes(i)
    );
    setSelectedIndexBG((prevIndices) => {
      const newBG = [...prevIndices];

      correctIndices.forEach((index) => {
        newBG[index] = " bg-green-600";
      });

      incorrectIndices.forEach((index) => {
        newBG[index] = " bg-red-600";
      });

      return newBG;
    });
    console.log(correctIndices);

    console.log(incorrectIndices);
  }

  if (isLoading) {
    return (
      <div className="text-center text-2xl pt-3 pb-16 bg-gray-200">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="bg-gray-200">
          <div className="flex flex-col items-center gap-4 pt-3 pb-8 bg-gray-200">
            <div className="text-2xl">Quiz Maker</div>
            <div className="bg-yellow-300 w-2/3 p-2 rounded-md flex flex-col gap-2 pb-4 shadow-md">
              <div className="text-center text-lg bg-gray-50 m-2 py-2 px-4 rounded-md shadow-md">
                Q. {quiz.question}
              </div>
              {quiz.options &&
                quiz.options.map((option, index) => {
                  return (
                    <div
                      onClick={() => selectIndices(index)}
                      key={index}
                      className={
                        "flex justify-between items-center text-white cursor-pointer p-2 rounded-md shadow-md text-lg" +
                        selectedIndexBG[index]
                      }
                    >
                      <div className="w-full">
                        {getOptionFromIndex(index)}. {option}
                      </div>
                    </div>
                  );
                })}
            </div>
            <button
              onClick={checkAnswer}
              className="w-2/3 text-white mt-2 bg-green-500 hover:bg-green-600 rounded-full py-1 text-xl shadow-md"
            >
              Check Answer
            </button>
            <div className="flex gap-2 w-2/3">
              <button
                onClick={loadPrevQuestion}
                className="w-1/2 text-white bg-red-500 hover:bg-red-600 rounded-full py-1 text-xl shadow-md"
              >
                Back
              </button>
              <button
                onClick={loadNextQuestion}
                className="w-1/2 text-white bg-blue-500 hover:bg-blue-600 rounded-full py-1 text-xl shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
