import { DataTypes } from "sequelize";
import db from "database/connection";

export const Specialist = db.define(
  "specialist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    discount: DataTypes.DECIMAL(11, 6),
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
