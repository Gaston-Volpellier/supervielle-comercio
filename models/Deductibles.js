import { DataTypes } from "sequelize";
import db from "database/connection";

export const Deductibles = db.define(
  "deductibles-franchises",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    percentage: DataTypes.DECIMAL(11, 6),
    amount: DataTypes.FLOAT,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false, tableName: "deductibles-franchises" }
);
