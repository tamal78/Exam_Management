import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MCQForm = ({ setShowMCQForm, show, onAddMcq, fetchdetails }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const navigate = useNavigate();
  const { examId } = useParams();

  const handleOptionChange = (optionIndex, value) => {
    let newOptions = [...options];
    newOptions[optionIndex] = value;
    setOptions(newOptions);
  };

  const handleMCQSubmit = async () => {
    const mcqData = {
      question,
      options,
      correctOption,
      examId
    };

    try {
      const response = await axios.post(
        'https://exam-api-gwj5.onrender.com/api/mcqs',
        mcqData
      );
      alert('MCQ added successfully!');
      // onAddMcq(response.data);
      fetchdetails();
      setShowMCQForm(false);
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectOption('');
    } catch (error) {
      console.error('Error submitting MCQ', error);
    }
  };

  const handleFinish = () => {
    navigate('/exams/');
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Question
        </label>
        <input
          type='text'
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
          required
        />
      </div>

      {options.map((option, index) => (
        <div key={index} className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Option {index + 1}
          </label>
          <input
            type='text'
            value={option}
            onChange={e => handleOptionChange(index, e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </div>
      ))}

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Correct Option
        </label>
        <input
          type='text'
          value={correctOption}
          onChange={e => setCorrectOption(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
          required
        />
      </div>

      <button
        type='button'
        onClick={handleMCQSubmit}
        className='bg-blue-500 text-white px-3 py-1 rounded mr-2'
      >
        Save MCQ
      </button>
      {!show && (
        <button
          type='button'
          onClick={handleFinish}
          className='bg-green-500 text-white px-3 py-1 rounded'
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default MCQForm;
