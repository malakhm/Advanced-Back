import dotenv from "dotenv";
import express from "express";
import sequelize from "./configuration/db.js";
import companiesRoutes from "./routes/companyRoute.js";
import feedbackRoutes from "./routes/feedbacks.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import router from "./routes/designRoute.js";
import messageRoute from "./routes/messageRoute.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import bodyParser from "body-parser";
import errorHandler from "./Middleware/hand.js";
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
app.use("/api/companies", companiesRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/designs", router);
app.use("/uploads", express.static("uploads"));

//connecting to db
sequelize.sync({ force: false });

app.use(errorHandler);
//Port
// const port = process.env.PORT;
// app.listen(port, () => {
//   try {
//     console.log(`The server is connected on Port: ${port}`);
//   } catch (error) {
//     console.log(error);
//   }
// });

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on("joinUserRoom", (user) => {
//     if (user.role === "user") {
//       socket.join("userRoom");
//     }
//   });
// });
// httpServer.listen(process.env.PORT);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000/','http://127.0.0.1:3000/'],
    methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  console.log("user connected",socket.id);

  socket.on("disconnect", () =>{
    console.log("user disconnected", socket.id);
  })
})
server.listen(process.env.PORT, ()=>{
  console.log('server running')
});
export default io;
