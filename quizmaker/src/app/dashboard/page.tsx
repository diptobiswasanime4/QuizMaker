"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      const resp = await axios.get("/api/dashboard");

      setQuestions(resp.data.data);
    }
    getData();
  }, []);

  async function loadQuestion(question) {
    router.push(`/dashboard/${question.quizIndex}`);
  }
  return (
    <div className="flex gap-2">
      <div className="bg-gray-500 flex flex-col gap-2 py-2">
        {questions.map((q, index) => {
          return (
            <div
              key={index}
              onClick={() => loadQuestion(q)}
              className="text-white px-2 hover:text-blue-200 cursor-pointer"
            >
              {q.question}
            </div>
          );
        })}
      </div>
      <div className="">Dashboard</div>
    </div>
  );
}

export default Dashboard;
