import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
