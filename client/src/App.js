import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ExamList from './components/ExamList.jsx';
import ExamForm from './components/ExamForm.jsx';
import MCQForm from './components/McqForm.jsx';
import ExamDetail from './components/ExamDetail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/exams/' element={<ExamList />} />
        <Route path='/exams/create/' element={<ExamForm />} />
        <Route path='/exams/:examId/mcqs/' element={<MCQForm />} />
        <Route path='/exams/:examId/' element={<ExamDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
