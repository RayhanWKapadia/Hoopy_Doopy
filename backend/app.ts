import express from 'express';
import playerRouter from './routes/playerRoutes';

const app = express();

app.use('/players', playerRouter);

export default app;
