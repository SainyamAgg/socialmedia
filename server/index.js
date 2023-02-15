import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/user', userRoutes);

mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port: ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(err);
})