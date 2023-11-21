"use client"
import React, { useState } from 'react'

function Create() {
    const [inputText, setInputText] = useState("")
    const [question, setQuestion] = useState("")
    const [options, setOptions] = useState([])

    function addQuestion() {
        setQuestion(inputText)
    }

    function addOption() {
        setOptions(prevOptions => [...prevOptions, inputText])
    }
  return (
    <div className="flex flex-col items-center gap-4 pt-4 pb-16 bg-gray-200">
        <div className="text-2xl">Quiz Maker</div>
        <textarea placeholder='Enter Question, Answer, etc.' className='w-2/3 pl-1 text-lg rounded-md shadow-md' value={inputText} onChange={e => setInputText(e.target.value)} />
        <div className="w-2/3 flex gap-2">
            <button onClick={addQuestion} className='w-1/2 text-white bg-blue-600 hover:bg-blue-500 rounded-md py-1 text-xl shadow-md'>Add Question</button>
            <button onClick={addOption} className='w-1/2 text-white bg-orange-600 hover:bg-orange-500 rounded-md py-1 text-xl shadow-md'>Add Option</button>
        </div>
        <div className="bg-yellow-300 w-2/3 p-2 mt-4 rounded-md flex flex-col gap-2 shadow-md">
            <div className="text-center text-xl">Q. {question}</div>
            {options.map((option, index) => {
                return (
                    <div className="bg-blue-400 text-white cursor-pointer p-2 rounded-md shadow-md text-lg">{option}</div>
                )
            })}
        </div>
        <button className='w-2/3 text-white mt-4 bg-violet-600 hover:bg-violet-500 rounded-full py-1 text-xl shadow-md'>Submit</button>
    </div>
  )
}

export default Create