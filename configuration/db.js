import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
//  connection
const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_-M_ym4s3-GcOpu9SXOe', {
  host: 'mysql-23819250-spaceloom.a.aivencloud.com',
  dialect: 'mysql',
  port:'17609',
});


// testing connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;