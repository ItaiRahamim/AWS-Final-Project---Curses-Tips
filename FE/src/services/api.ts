// src/services/api.ts
import axios from 'axios';
import { Course } from '../data/courses';

// אם יש כתובת API מפורשת - השתמש בה
// אחרת, השתמש באותו host אבל על פורט 3010
const getApiBase = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (apiUrl) {
    return `${apiUrl.replace(/\/$/, '')}/api/tips`;
  }
  
  // אם אין URL מפורש, השתמש באותו host על פורט 3010
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:3010/api/tips`;
};

const API_BASE = getApiBase();

export type Tip = {
  id: number;
  content: string;
};

export const fetchTips = async (course: Course): Promise<Tip[]> => {
  try {
    const res = await axios.get(`${API_BASE}/${course}`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Failed to fetch tips:', error);
    return [];
  }
};

export const addTip = async (course: Course, content: string): Promise<Tip> => {
  const res = await axios.post(`${API_BASE}/${course}`, { content });
  return res.data;
};

export const deleteTip = async (tipId: number): Promise<void> => {
  await axios.delete(`${API_BASE}/${tipId}`);
};