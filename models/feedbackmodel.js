import { DataTypes } from "sequelize";
import sequelize from "../configuration/db.js";
import User from "./userModel.js";
const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.hasMany(Feedback, { foreignKey: "UserId" });
Feedback.belongsTo(User, { foreignKey: "UserId" });

export default Feedback;
