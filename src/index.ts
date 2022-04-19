import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api/v1', require('./controllers/api_v1'));

app.get('/', (req, res) => {
  res.send('ATM Service');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
