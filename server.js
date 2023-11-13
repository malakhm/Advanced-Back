import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import companiesRoutes from './routes/companyRoute.js';
import feedbackRoutes from './routes/feedbacks.js';
import adminRoutes from './routes/adminRoute.js';
import categoriesRoutes from './routes/categoriesRoute.js';
import designRoutes from './routes/designRoute.js';
import db from './configuration/db.js'; 
const app = express();
const cors = require('cors');
// const corsOptions ={
//   origin:'*', 
//   credentials:true,          
// }

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/companies', companiesRoutes);
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/admins',adminRoutes);
app.use('/api/designs', designRoutes);
app.use('/uploads', express.static('uploads'));



//listen to port 
app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT);
    });
  