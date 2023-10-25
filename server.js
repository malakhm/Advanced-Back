import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import companiestRoutes from './routes/companieRoute.js';
import feedbackRoutes from './routes/feedbacks.js';
import db from './configuration/db.js'; 
const app = express();


// Middleware
app.use(express.json());
dotenv.config();


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/companies', companiestRoutes);
app.use('/api/feedbacks', feedbackRoutes)

//listen to port 
app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT);
    });
  
