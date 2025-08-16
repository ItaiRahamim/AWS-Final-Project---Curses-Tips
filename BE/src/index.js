import express from 'express';
import router  from './routes/tips.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT) || 3010;

// אפשר CORS מכל מקור
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use('/api/tips', router); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});