import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";

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

export default Message;
