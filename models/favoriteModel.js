import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
import Design from "./designModel.js";

const Favorite = sequelize.define(
  "Favorite",
  {},
  {
    timestamps: true,
  }
);

User.hasMany(Favorite, { foreignKey: "UserId" });
Favorite.belongsTo(User, { foreignKey: "UserId" });

Design.hasMany(Favorite, { foreignKey: "DesignId" });
Favorite.belongsTo(Design, { foreignKey: "DesignId" });

export default Favorite;
