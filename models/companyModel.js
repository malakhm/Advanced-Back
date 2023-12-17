import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

const Company = sequelize.define(
  'Company',
  {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  }

}  ,{
  timestamps: true,
});

export default Company
