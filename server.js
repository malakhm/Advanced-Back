import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import companiesRoutes from './routes/companieRoute.js';
import categoriesRoutes from './routes/categorieRoute .js';
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
app.use('/api/companies', companiesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/feedback', feedbackRoutes);



//listen to port 
app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT);
    });
  
