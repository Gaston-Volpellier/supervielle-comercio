import { DataTypes } from "sequelize";
import db from "database/connection";

export const Coverage = db.define(
  "coverage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING(1234),
    rate: DataTypes.DECIMAL(11, 6),
    formula: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
