const express = require('express');
const router = express.Router();
const MCQ = require('../models/MCQ');
const Exam = require('../models/Exam');

// POST: Create a new MCQ
router.post('/', async (req, res) => {
  try {
    const newMCQ = new MCQ(req.body);
    const savedMCQ = await newMCQ.save();

    // Add the MCQ to the associated exam's MCQs array
    await Exam.findByIdAndUpdate(savedMCQ.examId, {
      $push: { mcqs: savedMCQ._id }
    });

    res.status(201).json(savedMCQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all MCQs
router.get('/', async (req, res) => {
  try {
    const mcqs = await MCQ.find();
    res.json(mcqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a single MCQ by ID
router.get('/:id', async (req, res) => {
  try {
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq) return res.status(404).json({ message: 'MCQ not found' });
    res.json(mcq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an MCQ by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMCQ = await MCQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedMCQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an MCQ by ID
router.delete('/:id', async (req, res) => {
  try {
    const mcq = await MCQ.findByIdAndDelete(req.params.id);

    // Remove the MCQ from the associated exam's MCQs array
    await Exam.findByIdAndUpdate(mcq.examId, { $pull: { mcqs: mcq._id } });

    res.json({ message: 'MCQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
