import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Category;
