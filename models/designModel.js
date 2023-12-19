import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

import Company from "./companyModel.js";

const Design = sequelize.define(
  'Design',
  {
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: true });

Company.hasMany(Design, { foreignKey: 'CompanyId' });
Design.belongsTo(Company, { foreignKey: 'CompanyId' });

Company.hasMany(Design);

Design.belongsTo(Company);

Design.sync();

export default Design
