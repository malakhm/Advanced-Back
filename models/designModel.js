import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";
import Category from "./categoryModel.js";
import Company from "./companyModel.js";

const Design = sequelize.define(
  "Design",
  {
    images: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return this.getDataValue("images").split(";");
      },
      set(val) {
        this.setDataValue("images", val.join(";"));
      },
    },
  },
  { timestamps: true }
);
Company.hasMany(Design, { foreignKey: "CompanyId" });
Design.belongsTo(Company, { foreignKey: "CompanyId" });

Category.hasMany(Design, { foreignKey: "CategoryId"});
Design.belongsTo(Category, { foreignKey: "CategoryId" });


export default Design
