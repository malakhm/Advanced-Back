import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define(
  "Admin",
  {
    username: {
      type: DataTypes.STRING,
      required: true,
    },

    password: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Admin;
