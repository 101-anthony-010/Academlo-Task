const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Repair = db.define("repairs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  }
});

module.exports = Repair;