import { DataTypes } from "sequelize";
import db from "database/connection";

export const Activity = db.define(
  "activity",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: DataTypes.STRING(1234),
    briefDescription: DataTypes.STRING,
    exclusion: DataTypes.STRING(1234),
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);
