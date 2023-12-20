import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const fetchExams = () => {
    axios
      .get('https://exam-api-gwj5.onrender.com/api/exams')
      .then(response => {
        setExams(response.data);
      })
      .catch(error => console.error('Error fetching exams', error));
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const deleteExam = examId => {
    axios
      .delete(`https://exam-api-gwj5.onrender.com/api/exams/${examId}`)
      .then(() => {
        fetchExams();
      })
      .catch(error => console.error('Error fetching exams', error));
  };
  const editExam = examId => {
    navigate(`/exams/${examId}`);
  };

  return (
    <div className='container mx-auto p-4'>
      <button
        onClick={() => {
          navigate(`/`);
        }}
        type='button'
        className='rounded-md bg-black p-4 mb-7 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
      >
        Home
      </button>
      <h1 className='text-2xl font-bold mb-4'>Exams</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {exams.map(exam => (
          <div key={exam._id} className='border p-4 rounded'>
            <h2 className='text-xl font-semibold'>Exam Title: {exam.title}</h2>
            <p>Duration: {exam.duration} minutes</p>
            <button
              type='button'
              className='mr-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
              onClick={() => {
                editExam(exam._id);
              }}
            >
              Edit
            </button>
            <button
              type='button'
              className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
              onClick={() => {
                deleteExam(exam._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;
