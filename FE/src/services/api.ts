// src/services/api.ts
import axios from 'axios';
import { Course } from '../data/courses';

const apiUrl = process.env.REACT_APP_API_URL;
const apiBase = `${apiUrl ? apiUrl.replace(/\/$/, '') : ''}/api/tips`;

export type Tip = {
  id: number;
  content: string;
};

export const fetchTips = async (course: Course): Promise<Tip[]> => {
  const res = await axios.get(`${apiBase}/${course}`);
  return res.data;
};

export const addTip = async (course: Course, content: string): Promise<Tip> => {
  const res = await axios.post(`${apiBase}/${course}`, { content });
  return res.data;
};

export const deleteTip = async (tipId: number): Promise<void> => {
  await axios.delete(`${apiBase}/${tipId}`);
};
