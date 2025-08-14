// src/services/api.ts
import axios from 'axios';
import { Course } from '../data/courses';

const explicitApiUrl = process.env.REACT_APP_API_URL?.trim();
const explicitApiPort = process.env.REACT_APP_API_PORT?.trim();

const resolveApiBase = (): string => {
  if (explicitApiUrl) {
    return `${explicitApiUrl.replace(/\/$/, '')}/api/tips`;
  }
  if (explicitApiPort) {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:${explicitApiPort}/api/tips`;
  }
  // Dev proxy or ALB path-based routing
  return '/api/tips';
};

const apiBase = resolveApiBase();

export type Tip = {
  id: number;
  content: string;
};

const isTipArray = (data: unknown): data is Tip[] => {
  return Array.isArray(data) && data.every((t) => {
    return t && typeof (t as any).id === 'number' && typeof (t as any).content === 'string';
  });
};

export const fetchTips = async (course: Course): Promise<Tip[]> => {
  const res = await axios.get(`${apiBase}/${course}`);
  if (!isTipArray(res.data)) {
    throw new Error('Invalid API response: expected an array of tips');
  }
  return res.data;
};

export const addTip = async (course: Course, content: string): Promise<Tip> => {
  const res = await axios.post(`${apiBase}/${course}`, { content });
  return res.data;
};

export const deleteTip = async (tipId: number): Promise<void> => {
  await axios.delete(`${apiBase}/${tipId}`);
};
