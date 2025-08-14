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
    console.log('Getting tips for course:', courseName);
    const tips = await getTipsByCourse(courseName);
    console.log('Tips found:', tips);
    // וודא שאנחנו תמיד מחזירים מערך
    const tipsArray = Array.isArray(tips) ? tips : [];
    res.status(200).json(tipsArray);
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

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Tip content is required' });
    }

    const newTip = await addTip(courseName, content);
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
    await removeTip(tipId);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting tip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};