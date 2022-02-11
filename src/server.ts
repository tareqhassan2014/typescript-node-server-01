import 'dotenv/config';
import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.json('hello world');
});

const port = process.env.PORT || 5555;

app.listen(port, () => console.log(`server is running on port ${port}`));
