import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize('Spaceloom', 'sa', `${process.env.DB_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mssql'
  });

export default sequelize;