import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExamForm = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://exam-management-tamal78.vercel.app/api/exams',
        {
          title,
          duration
        }
      );
      navigate(`/exams/${response.data._id}/mcqs`);
    } catch (error) {
      console.error('Error creating exam', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='duration'
            className='block text-sm font-medium text-gray-700'
          >
            Duration (minutes)
          </label>
          <input
            type='number'
            id='duration'
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Create Exam and Add MCQs
        </button>
      </form>
    </div>
  );
};

export default ExamForm;
