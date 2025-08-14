// src/controllers/habits.controller.js
import {
  getTipsByCourse,
  addTip,
  removeTip
} from '../services/tips.service.js';

// GET /api/tips/:courseName
export const getAllTips = async (req, res) => {
  try {
    const courseName = req.params.courseName;
    console.log('GET request for course:', courseName);
    const tips = await getTipsByCourse(courseName);
    console.log('Sending tips:', tips);
    res.status(200).json(tips);
  } catch (error) {
    console.error('Error getting tips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/tips/:courseName
export const createTip = async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const { content } = req.body;
    console.log('POST request - Adding tip to course:', courseName, 'content:', content);

    if (!content || content.trim() === '') {
      console.log('Invalid content - empty');
      return res.status(400).json({ error: 'Tip content is required' });
    }

    const newTip = await addTip(courseName, content);
    console.log('Created new tip:', newTip);
    res.status(201).json(newTip);
  } catch (error) {
    console.error('Error creating tip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/tips/:tipId
export const deleteTip = async (req, res) => {
  try {
    const tipId = req.params.tipId;
    console.log('DELETE request for tip:', tipId);
    await removeTip(tipId);
    console.log('Tip deleted successfully:', tipId);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting tip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};