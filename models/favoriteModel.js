import sequelize from "../configuration/db.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
import Design from "./designModel.js";

const Favorite = sequelize.define(
  "Favorite",
  {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    DesignId: {
      type: DataTypes.INTEGER,
      references: {
        model: Design,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Favorite;
