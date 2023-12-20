const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const MCQ = require('../models/MCQ');

// POST: Create a new exam
router.post('/', async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find().populate('mcqs');
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a single exam by ID
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('mcqs');
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update Exams

router.put('/:id', async (req, res) => {
  try {
    const { mcqs, ...examData } = req.body;

    // Update each MCQ if MCQ data is provided
    if (mcqs && mcqs.length > 0) {
      await Promise.all(
        mcqs.map(async mcq => {
          if (mcq._id) {
            await MCQ.findByIdAndUpdate(mcq._id, mcq);
          } else {
            const newMCQ = new MCQ(mcq);
            await newMCQ.save();
          }
        })
      );
    }

    // Update the exam
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, examData, {
      new: true
    }).populate('mcqs'); // Optionally populate MCQs if needed in the response

    res.json(updatedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an exam by ID
router.delete('/:id', async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
