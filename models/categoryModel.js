import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";
import Company from "./companyModel.js";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Company.hasMany(Category, { foreignKey: "CompanyId"});
Category.belongsTo(Company, { foreignKey: "CompanyId" });

export default Category;
