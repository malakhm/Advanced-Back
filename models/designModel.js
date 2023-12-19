// import { DataTypes } from "sequelize";
// import sequelize from "../configuration/db.js";

// import Company from "./companyModel.js";
// import Category from "./categoryModel.js";

// const Design = sequelize.define(
//   "Design",
//   {
//     images: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// Company.hasMany(Design, { foreignKey: "CompanyId" });
// Design.belongsTo(Company, { foreignKey: "CompanyId" });

// Category.hasMany(Design, { foreignKey: "CategoryId" });
// Design.belongsTo(Category, { foreignKey: "CategoryId" });

// export default Design;
