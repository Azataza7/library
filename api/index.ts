import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import authorRouter from './routes/authorRouter';
import genreRouter from './routes/genreRouter';
import bookRouter from './routes/bookRouter';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/author', authorRouter);
app.use('/genre', genreRouter);
app.use('/book-library', bookRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
