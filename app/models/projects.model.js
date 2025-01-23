const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequalize.config");

const Project = sequelize.define(
  "Project",
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: "created_at",
    },
  },
  {
    tableName: "projects",
    timestamps: false,
    indexes: [
      {
        name: "idx_projects_user_id",
        fields: ["user_id"],
      },
      {
        name: "idx_projects_project_id",
        fields: ["project_id"],
      },
    ],
  }
);

module.exports = Project;
