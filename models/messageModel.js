import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";
import Company from "./companyModel.js";
import User from "./userModel.js";
const Message = sequelize.define(
  "Message",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Company.hasMany(Message, { foreignKey: "CompanyId" });
Message.belongsTo(Company, { foreignKey: "CompanyId" });

User.hasMany(Message, { foreignKey: "UserId" });
Message.belongsTo(User, { foreignKey: "UserId" });

export default Message;
