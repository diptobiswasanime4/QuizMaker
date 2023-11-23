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

  return (
    <div className="flex gap-2">
      <div className="text-2xl">Dashboard</div>
    </div>
  );
}

export default Dashboard;
