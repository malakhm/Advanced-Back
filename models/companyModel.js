import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

const Company = sequelize.define(
  'Company',
  {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "../profileiamge.jpg"
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }

}  ,{
  timestamps: true,
});



export default Company
