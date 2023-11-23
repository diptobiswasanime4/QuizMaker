"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questions, setQuestions] = useState([]);
  const [openLeftbar, setOpenLeftbar] = useState(false);
  const [arrowStyle, setArrowStyle] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      const resp = await axios.get("/api/dashboard");

      setQuestions(resp.data.data);
    }
    getData();
  }, []);

  function toggleLeftbar() {
    setOpenLeftbar(!openLeftbar);
    setArrowStyle((prevArrowStyle) => {
      const newArrowStyle =
        prevArrowStyle === " rotate-180" ? "" : " rotate-180";
      return newArrowStyle;
    });
  }

  async function loadQuestion(question) {
    router.push(`/dashboard/${question.quizIndex}`);
  }
  return (
    <div className="flex gap-2">
      <div className="h-[500px] flex">
        {openLeftbar && (
          <div className="bg-gray-500 flex flex-col gap-2 pt-2 pb-4">
            {questions.map((q, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadQuestion(q)}
                  className="text-white px-2 hover:text-blue-200 cursor-pointer"
                >
                  {index + 1}. {q.question}
                </div>
              );
            })}
          </div>
        )}
        <div
          onClick={toggleLeftbar}
          className={
            "bg-gray-900 hover:opacity-80 flex items-center cursor-pointer" +
            arrowStyle
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white hover:scale-125"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
