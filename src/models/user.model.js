const { DataTypes } = require("sequelize");
const { db } = require("./../database/config");

const User = db.define("users", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("client", "employee"),
    allowNull: false,
    defaultValue: "client"
  },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = User;