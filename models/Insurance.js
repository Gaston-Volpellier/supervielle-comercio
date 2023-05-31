import { DataTypes } from "sequelize";
import db from "database/connection";

export const Insurance = db.define(
  "insurance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING(1234),
    min: DataTypes.DECIMAL(11, 6),
    max: DataTypes.DECIMAL(11, 6),
    recommended: DataTypes.FLOAT,
    maxValue: DataTypes.INTEGER,
    minValue: DataTypes.INTEGER,
    rate: DataTypes.DECIMAL,
    formula: DataTypes.STRING,
    required: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
