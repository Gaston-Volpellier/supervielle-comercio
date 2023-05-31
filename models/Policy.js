import { DataTypes } from "sequelize";
import db from "database/connection";

export const Policy = db.define(
  "policy",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    branch: DataTypes.INTEGER,
    specialist: DataTypes.INTEGER,
    recipient: DataTypes.STRING,
    legalName: DataTypes.STRING,
    cuit: DataTypes.STRING,
    IVA: DataTypes.INTEGER,
    IIBB: DataTypes.INTEGER,
    email: DataTypes.STRING,
    prefix: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.INTEGER,
    homeAddress: DataTypes.STRING,
    homeProvince: DataTypes.INTEGER,
    homeLocality: DataTypes.INTEGER,
    riskAddress: DataTypes.STRING,
    riskLocality: DataTypes.INTEGER,
    riskProvince: DataTypes.INTEGER,
    CP: DataTypes.INTEGER,
    activity: DataTypes.INTEGER,
    surface: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    cardNumber: DataTypes.STRING,
    expiration: DataTypes.STRING,
    emitted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insuranceData: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: true }
);
