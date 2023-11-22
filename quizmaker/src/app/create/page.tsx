"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Quiz } from "@/types/Quiz";
import getOptionFromIndex from "@/utils/getOptionFromIndex";
import { useRouter } from "next/navigation";

function Create() {
  const [inputText, setInputText] = useState("");
  const [question, setQuestion] = useState(
    "Set your question here, add options, click on an option to set is as correct, dbl-click to revert back."
  );
  const [options, setOptions] = useState([]);
  const [rightAnswerIndices, setRightAnswerIndices] = useState([]);
  const [optionBG, setOptionBG] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionEditMode, setOptionEditMode] = useState(false);
  const router = useRouter();

  function addQuestion() {
    setQuestion(inputText);
  }

  function addOption() {
    setOptions((prevOptions) => [...prevOptions, inputText]);
    setOptionBG((prevOptions) => [...prevOptions, " bg-blue-400"]);
  }

  function selectRightAnswerIndices(e, index) {
    if (!previewMode) {
      setRightAnswerIndices((prevIndices) => {
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
      setOptionBG((prevOptions) => {
        const newBg = [...prevOptions];
        newBg[index] =
          newBg[index] === " bg-green-600" ? " bg-blue-400" : " bg-green-600";
        return newBg;
      });
    } else {
      setSelectedOptions((prevOptions) => {
        const indexExists = prevOptions.includes(index);

        if (indexExists) {
          const newOptions = prevOptions.filter(
            (prevIndex) => prevIndex !== index
          );
          return newOptions;
        } else {
          return [...prevOptions, index];
        }
      });
      setOptionBG((prevOptions) => {
        const newBg = [...prevOptions];
        newBg[index] =
          newBg[index] !== " bg-blue-700" ? " bg-blue-700" : " bg-blue-400";
        return newBg;
      });
    }
  }

  function viewPreview() {
    setPreviewMode(true);
  }

  function checkAnswer() {
    const correctOptions = rightAnswerIndices;
    const incorrectOptions = selectedOptions.filter(
      (option) => !correctOptions.includes(option)
    );
    setOptionBG((prevOptions) => {
      const newBG = [...prevOptions];

      correctOptions.forEach((index) => {
        newBG[index] = " bg-green-600";
      });

      incorrectOptions.forEach((index) => {
        newBG[index] = " bg-red-600";
      });

      return newBG;
    });
  }

  function deleteOption(e, index) {
    setOptions((prevOptions) =>
      prevOptions.filter((_, optionIndex) => optionIndex !== index)
    );
  }

  async function onSubmit() {
    const data: Quiz = {
      question,
      options,
      rightAnswerIndices,
    };
    console.log(data);

    const resp = await axios.post("/api/create", data);
    console.log(resp);
  }

  if (previewMode) {
    return (
      <div className="bg-gray-200">
        <div className="flex flex-col items-center gap-4 pt-3 pb-8 bg-gray-200">
          <div className="text-2xl">Quiz Maker</div>
          <div className="bg-yellow-300 w-2/3 p-2 rounded-md flex flex-col gap-2 pb-4 shadow-md">
            <div className="text-center text-lg bg-gray-50 m-2 py-2 px-4 rounded-md shadow-md">
              Q. {question}
            </div>
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className={
                    "flex justify-between items-center text-white cursor-pointer p-2 rounded-md shadow-md text-lg" +
                    optionBG[index]
                  }
                  onClick={(e) => selectRightAnswerIndices(e, index)}
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
            className="w-2/3 text-white mt-2 bg-orange-500 hover:bg-orange-400 rounded-full py-1 text-xl shadow-md"
          >
            Check Answer
          </button>
          <button
            onClick={() => setPreviewMode(false)}
            className="w-2/3 text-white bg-violet-600 hover:bg-violet-500 rounded-full py-1 text-xl shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-200">
        <div className="flex flex-col items-center gap-4 pt-3 pb-8">
          <div className="text-2xl">Quiz Maker</div>
          <textarea
            placeholder="Enter Question, Answer, etc."
            className="w-2/3 p-1 mb-1 text-lg rounded-md shadow-md"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="w-2/3 flex gap-2">
            <button
              onClick={addQuestion}
              className="w-1/2 text-white bg-blue-600 hover:bg-blue-500 rounded-md py-1 text-xl shadow-md"
            >
              Set Question
            </button>
            <button
              onClick={addOption}
              className="w-1/2 text-white bg-orange-600 hover:bg-orange-500 rounded-md py-1 text-xl shadow-md"
            >
              Add Option
            </button>
          </div>
          <div className="bg-yellow-300 w-2/3 p-2 mt-2 rounded-md flex flex-col gap-2 pb-4 shadow-md">
            <div className="text-center text-lg bg-gray-50 m-2 py-2 px-4 rounded-md shadow-md">
              Q. {question}
            </div>
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className={
                    "flex justify-between items-center text-white cursor-pointer p-2 rounded-md shadow-md text-lg" +
                    optionBG[index]
                  }
                >
                  <div
                    className="w-full"
                    onClick={(e) => selectRightAnswerIndices(e, index)}
                  >
                    {getOptionFromIndex(index)}. {option}
                  </div>
                  <div className="flex gap-1 pr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-600"
                      onClick={(e) => deleteOption(e, index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={viewPreview}
            className="w-2/3 text-white mt-2 bg-orange-500 hover:bg-orange-400 rounded-full py-1 text-xl shadow-md"
          >
            Preview
          </button>
          <button
            onClick={onSubmit}
            className="w-2/3 text-white bg-violet-600 hover:bg-violet-500 rounded-full py-1 text-xl shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Create;
