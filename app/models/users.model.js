const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequalize.config");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        name: "idx_users_email",
        fields: ["email"],
      },
      {
        name: "idx_users_user_id",
        fields: ["user_id"],
      },
    ],
  }
);

module.exports = User;
