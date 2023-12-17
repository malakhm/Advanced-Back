import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

import Company from "./companyModel.js";
import Category from "./categoryModel.js";

const Design = sequelize.define(
  "Design",
  {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Company.hasMany(Design, { foreignKey: "CompanyId" });
Design.belongsTo(Company, { foreignKey: "CompanyId" });

Category.hasMany(Design, { foreignKey: "CategoryId", onDelete: "CASCADE" });
Design.belongsTo(Category, { foreignKey: "CategoryId" });

export default Design;
