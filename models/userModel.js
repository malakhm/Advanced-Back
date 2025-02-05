import sequelize from "../configuration/db.js"; 
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:'https://res.cloudinary.com/dxg6ijfbf/image/upload/v1704389759/designs/j4ohhmghrsx0wmx5pdqh.jpg'

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["Admin", "User"]),
      defaultValue: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default User;
