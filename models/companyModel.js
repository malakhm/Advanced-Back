import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

const Company = sequelize.define(
  'Company',
  {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  telephone: {
    type: DataTypes.STRING,
    required: true,
  },
  logo: {
    type: DataTypes.STRING,
    required: true
  },
  location: {
    type: DataTypes.STRING,
    required: true,
  },
  website_link: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },

}  ,{
  timestamps: true,
});

export default Company
