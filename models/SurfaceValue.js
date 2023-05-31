import { DataTypes } from "sequelize";
import db from "database/connection";

export const SurfaceValue = db.define(
  "surface-value",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
