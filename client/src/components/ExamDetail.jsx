import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import McqForm from './McqForm';

const ExamDetail = () => {
  const [exam, setExam] = useState({ title: '', duration: '', mcqs: [] });
  const { examId } = useParams();
  const navigate = useNavigate();
  const [showMCQForm, setShowMCQForm] = useState(false);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(
        `https://exam-api-gwj5.onrender.com/api/exams/${examId}`
      );
      setExam(response.data);
    } catch (error) {
      console.error('Error fetching exam details', error);
    }
  };
  useEffect(() => {
    fetchExamDetails();
    fetchExamDetails();
  }, [examId]);

  const handleExamChange = e => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleMCQChange = (mcqIndex, e) => {
    let newMCQs = [...exam.mcqs];
    if (e.target.name.startsWith('option')) {
      let optionIndex = parseInt(e.target.name.split('-')[1]);
      newMCQs[mcqIndex].options[optionIndex] = e.target.value;
    } else {
      newMCQs[mcqIndex][e.target.name] = e.target.value;
    }
    setExam({ ...exam, mcqs: newMCQs });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://exam-api-gwj5.onrender.com/api/exams/${examId}`,
        exam
      );
      alert('Exam and MCQs updated successfully!');
      navigate('/exams/');
    } catch (error) {
      console.error('Error updating exam and MCQs', error);
    }
  };

  const handleDeleteMCQ = async (mcqId, index) => {
    try {
      await axios.delete(
        `https://exam-api-gwj5.onrender.com/api/mcqs/${mcqId}`
      );
      // Remove the MCQ from the local state to update the UI
      const updatedMCQs = [...exam.mcqs];
      updatedMCQs.splice(index, 1);
      setExam({ ...exam, mcqs: updatedMCQs });
    } catch (error) {
      console.error('Error deleting MCQ', error);
    }
  };
  const handleAddMCQ = async newMCQ => {
    try {
      await axios.post('https://exam-api-gwj5.onrender.com/api/mcqs', newMCQ);
      setShowMCQForm(false);
      fetchExamDetails();
    } catch (error) {
      console.error('Error adding MCQ', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          value={exam.title}
          onChange={handleExamChange}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md'
        />
      </div>
      <div className='mb-4'>
        <label>Duration (minutes)</label>
        <input
          type='number'
          name='duration'
          value={exam.duration}
          onChange={handleExamChange}
          className='block w-full px-3 py-2 border border-gray-300 rounded-md font-semibold'
        />
      </div>
      <button
        type='button'
        onClick={() => {
          setShowMCQForm(true);
        }}
        className='bg-blue-500 text-white p-3  rounded mr-2 my-5 mb-10'
      >
        Add MCQ
      </button>
      {showMCQForm && (
        <McqForm
          onAddMcq={handleAddMCQ}
          show={showMCQForm}
          fetchdetails={fetchExamDetails}
          setShowMCQForm={setShowMCQForm}
        />
      )}
      {exam.mcqs.map((mcq, index) => (
        <div key={mcq._id} className='mb-4'>
          <label>Question {index + 1}</label>
          <button
            onClick={() => handleDeleteMCQ(mcq._id, index)}
            className='bg-red-500 text-white px-3 py-1 rounded m-2'
          >
            Delete
          </button>
          <input
            type='text'
            name='question'
            value={mcq.question}
            onChange={e => handleMCQChange(index, e)}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md'
          />

          {mcq.options.map((option, optIndex) => (
            <div key={optIndex} className='mb-2'>
              <label>Option {optIndex + 1}</label>
              <input
                type='text'
                name={`option-${optIndex}`}
                value={option}
                onChange={e => handleMCQChange(index, e)}
                className='block w-full px-3 py-2 border border-gray-300 rounded-md'
              />
            </div>
          ))}
          <div className='mb-2'>
            <label>Correct Option</label>
            <input
              type='text'
              name='correctOption'
              value={mcq.correctOption}
              onChange={e => handleMCQChange(index, e)}
              className='block w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleSave}
        className='bg-blue-500 text-white px-3 py-1 rounded'
      >
        Save Changes
      </button>
    </div>
  );
};

export default ExamDetail;
