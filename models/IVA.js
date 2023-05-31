import { DataTypes } from "sequelize";
import db from "database/connection";

export const IVA = db.define(
  "iva",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false, tableName: "iva" }
);
