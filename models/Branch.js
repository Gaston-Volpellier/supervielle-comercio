import { DataTypes, INTEGER } from "sequelize";
import db from "database/connection";

export const Branch = db.define(
  "branch",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    province: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
