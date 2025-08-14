import express from 'express';
import router  from './routes/tips.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT) || 3010;

app.use(express.json());

// בפיתוח - מאפשר הכל. בפרודקשן - יוגדר ע"י Terraform
app.use(cors());

app.use('/api/tips', router); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});