const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequalize.config");

const Task = sequelize.define(
  "Task",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.DATE,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: "created_at",
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
        key: "project_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
    indexes: [
      {
        name: "tasks_user_id_idx", 
        fields: ["user_id"],
      },
      {
        name: "tasks_project_id_idx", 
        fields: ["project_id"],
      },
    ],
  }
);

module.exports = Task;
