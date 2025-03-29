"use strict";

const redisService = require("../../service/redisService");
const taskModel = require("./taskSchemas");

/**
 * @typedef {Object} Task
 * @property {string} title
 * @property {string} [description]
 * @property {Date} [createdAt]
 * @property {"TODO" | "IN_PROGRESS" | "DONE"} [status]
 * @property {string} [userId]
 */

/**
 * Cria uma nova tarefa no banco de dados
 * @param {Task} _task - Objeto contendo os dados da tarefa
 * @returns {Promise<mongoose.Document>} Promise resolvida com o documento salvo
 */
async function createTask(_task) {
  if (_task?.status !== "TODO") {
    throw new Error("Invalid status");
  }
  const task = new taskModel(_task);
  return await task.save();
}

/**
 * @param {number} limit
 * @param {number} offset
 * @returns
 */
async function listTask(limit, offset) {
  const tasks = await taskModel.find({}, {}, { skip: offset, limit });
  return tasks;
}

/**
 * @param {string|mongoose.Types.ObjectId} _taskId - The ID of the task to find (string or ObjectId)
 * @returns {Promise<mongoose.Document|null>}
 */
async function findTaskById(_taskId) {
  const cachedTask = await redisService.client.get(_taskId);

  if (cachedTask) {
    return cachedTask;
  }

  const task = await taskModel.findById(_taskId);

  await redisService.client.set(
    task._id.toString(),
    JSON.stringify(task.toObject()),
    { EX: 30 }
  );

  return task;
}

/**
 * Delete's task by its unique identifier
 * @param {string|mongoose.Types.ObjectId} _taskId
 * @returns {Promise<void>}
 */
async function deleteTaskById(_taskId) {
  const task = await findTaskById(_taskId);

  if (!task) {
    throw new Error("Task with guiven ID not found!");
  }

  await taskModel.deleteOne({ _id: _taskId });
  return;
}

module.exports = {
  createTask,
  listTask,
  findTaskById,
  deleteTaskById,
};
