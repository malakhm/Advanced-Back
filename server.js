import dotenv from 'dotenv';
import express from 'express';
import sequelize from "./configuration/db.js"
import companiesRoutes from './routes/companyRoute.js';
import feedbackRoutes from './routes/feedbacks.js';
import userRoute from "./routes/userRoute.js";
import categoryRoute from './routes/categoryRoute.js';
import router from './routes/designRoute.js';
import cors  from "cors";
import bodyParser from "body-parser";
import errorHandler from './Middleware/hand.js'
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/companies', companiesRoutes);
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/categories', categoryRoute)
app.use("/api/users", userRoute);
app.use('/api/designs', router);
// app.use('/uploads', express.static('uploads'));

//connecting to db
sequelize.sync({ force: false });

app.use(errorHandler)
//Port
const port = process.env.PORT;
app.listen(port, () => {
  try {
    console.log(`The server is connected on Port: ${port}`);
  } catch (error) {
    console.log(error);
  }
});
